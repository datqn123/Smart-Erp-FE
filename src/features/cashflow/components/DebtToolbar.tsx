import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, Download, Trash2, CreditCard } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DebtToolbarProps {
  searchStr: string
  onSearch: (val: string) => void
  statusFilter: string
  onStatusChange: (val: string) => void
  typeFilter: string
  onTypeChange: (val: string) => void
  selectedIds: number[]
  onAction: (action: string) => void
}

export function DebtToolbar({ 
  searchStr, onSearch, statusFilter, onStatusChange, typeFilter, onTypeChange, selectedIds, onAction 
}: DebtToolbarProps) {
  const hasSelection = selectedIds.length > 0

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md p-4 border-x border-t border-slate-200/60 rounded-t-xl shrink-0 shadow-sm">
      <div className="relative flex-1 w-full max-w-md group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <Input 
          placeholder="Tìm theo mã nợ, tên đối tác..." 
          className="pl-10 h-10 bg-white border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all rounded-lg"
          value={searchStr}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="min-w-[180px] w-fit h-10 bg-white border-slate-200 rounded-lg px-4 text-slate-700">
            <Filter className="h-4 w-4 mr-2 text-slate-400" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white">
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="InDebt">Còn nợ</SelectItem>
            <SelectItem value="Cleared">Đã tất toán</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="min-w-[180px] w-fit h-10 bg-white border-slate-200 rounded-lg px-4 text-slate-700">
            <SelectValue placeholder="Loại đối tác" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white">
            <SelectItem value="all">Tất cả đối tác</SelectItem>
            <SelectItem value="Customer">Khách hàng</SelectItem>
            <SelectItem value="Supplier">Nhà cung cấp</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />

        {hasSelection ? (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 px-4 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg"
              onClick={() => onAction("repay")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Thanh toán ({selectedIds.length})
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 px-4 text-red-600 border-red-200 bg-red-50 hover:bg-red-100 rounded-lg"
              onClick={() => onAction("delete")}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xoá
            </Button>
          </div>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 px-4 text-slate-600 border-slate-200 hover:bg-slate-50 rounded-lg"
              onClick={() => onAction("export")}
            >
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
            <Button 
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 rounded-lg"
              onClick={() => onAction("create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo khoản nợ
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
