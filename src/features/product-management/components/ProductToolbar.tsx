import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trash2, Edit2, Plus, Download, Upload } from "lucide-react"

interface ProductToolbarProps {
  searchStr: string
  onSearch: (val: string) => void
  statusFilter: string
  onStatusChange: (val: string) => void
  categoryFilter: string
  onCategoryChange: (val: string) => void
  categories: string[]
  selectedIds: number[]
  onAction: (action: string) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProductToolbar({
  searchStr, onSearch, statusFilter, onStatusChange,
  categoryFilter, onCategoryChange, categories,
  selectedIds, onAction, fileInputRef, onFileChange
}: ProductToolbarProps) {
  const hasSelection = selectedIds.length > 0;

  return (
    <div className="bg-white p-4 space-y-3 border-b md:border border-slate-200 md:rounded-t-md shrink-0">
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo tên hoặc mã SKU..."
              value={searchStr}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 min-h-[44px] sm:min-h-[36px] w-full"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-11 sm:h-9 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:min-w-[160px] sm:w-fit rounded-md"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Ngừng</option>
          </select>
          <select 
            value={categoryFilter} 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-11 sm:h-9 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:min-w-[180px] sm:w-fit rounded-md"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Group Actions - Always visible */}
        <div className="flex flex-wrap items-center gap-2 pt-2 xl:pt-0 pb-1 xl:pb-0 w-full xl:w-auto xl:justify-end">
          <div className={`flex items-center gap-2 ${!hasSelection ? 'opacity-50' : ''}`}>
            <span className="text-sm font-medium text-slate-700 mr-2 min-w-[100px] xl:min-w-0 hidden sm:inline-block">
              Đã chọn: {selectedIds.length}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => hasSelection ? onAction("edit") : undefined}
              className="min-h-[44px] sm:min-h-[36px]"
            >
              <Edit2 className="mr-1.5 h-4 w-4" />Sửa
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => hasSelection ? onAction("delete") : undefined}
              className="min-h-[44px] sm:min-h-[36px] bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />Xoá
            </Button>
          </div>
          
          <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>
          
          <Button onClick={() => onAction("create")} className="h-11 sm:h-9 bg-slate-900 hover:bg-slate-800 text-white ml-auto sm:ml-0">
            <Plus className="h-4 w-4 mr-2" /> Tạo sản phẩm
          </Button>
          <Button onClick={() => onAction("export")} variant="outline" className="h-11 sm:h-9 hidden sm:flex">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button onClick={() => onAction("import")} variant="outline" className="h-11 sm:h-9 hidden sm:flex">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onFileChange} />
        </div>
      </div>
    </div>
  )
}
