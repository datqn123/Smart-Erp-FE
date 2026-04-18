import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Trash2, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LocationToolbarProps {
  searchStr: string
  onSearch: (val: string) => void
  statusFilter: string
  onStatusChange: (val: string) => void
  selectedIds: number[]
  onAction: (action: string) => void
}

export function LocationToolbar({ 
  searchStr, 
  onSearch, 
  statusFilter, 
  onStatusChange, 
  selectedIds, 
  onAction 
}: LocationToolbarProps) {
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="bg-white border-x border-t border-slate-200/60 p-4 rounded-t-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Tìm theo mã vị trí, khu vực..." 
            value={searchStr}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px] h-10 border-slate-200">
            <Filter className="h-4 w-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="Active">Khả dụng</SelectItem>
            <SelectItem value="Full">Đã đầy</SelectItem>
            <SelectItem value="Inactive">Bảo trì</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        {hasSelection && (
          <Button variant="destructive" size="sm" className="h-10" onClick={() => onAction("delete")}>
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa {selectedIds.length}
          </Button>
        )}

        <Button 
          variant="default" 
          size="sm" 
          className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white ml-auto"
          onClick={() => onAction("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm vị trí
        </Button>
      </div>
    </div>
  )
}
