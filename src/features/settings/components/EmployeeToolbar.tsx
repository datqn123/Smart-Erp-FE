import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Trash2, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmployeeToolbarProps {
  searchStr: string
  onSearch: (val: string) => void
  roleFilter: string
  onRoleChange: (val: string) => void
  selectedIds: number[]
  onAction: (action: string) => void
}

export function EmployeeToolbar({ 
  searchStr, 
  onSearch, 
  roleFilter, 
  onRoleChange, 
  selectedIds, 
  onAction 
}: EmployeeToolbarProps) {
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="bg-white border-x border-t border-slate-200/60 p-4 rounded-t-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-[320px] group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Tìm theo tên, mã NV, email..." 
            value={searchStr}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
          />
        </div>
        
          <Select value={roleFilter} onValueChange={onRoleChange}>
            <SelectTrigger className="w-[140px] h-10 border-slate-200">
              <SlidersHorizontal className="h-4 w-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white">
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Warehouse">Warehouse</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        {hasSelection && (
          <Button 
            variant="destructive" 
            size="sm" 
            className="h-10 px-4 animate-in fade-in slide-in-from-right-2" 
            onClick={() => onAction("delete")}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa {selectedIds.length}
          </Button>
        )}

        <Button 
          variant="default" 
          size="sm" 
          className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 ml-auto"
          onClick={() => onAction("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhân viên
        </Button>
      </div>
    </div>
  )
}
