import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockCategories } from "../mockData"
import type { Category } from "../types"
import { CategoryToolbar } from "../components/CategoryToolbar"
import { CategoryTable } from "../components/CategoryTable"
import { toast } from "sonner"

// Helper to flatten categories for select all
function flattenCategories(categories: Category[]): Category[] {
  let result: Category[] = [];
  categories.forEach(c => {
    result.push(c);
    if (c.children) {
      result = result.concat(flattenCategories(c.children));
    }
  });
  return result;
}

export function CategoriesPage() {
  const { setTitle } = usePageTitle()
  
  const [categories] = useState(mockCategories)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => { setTitle("Danh mục sản phẩm") }, [setTitle])

  // Filter both parent and children simply here for demonstration
  // Real implementation might need to keep parent structure if children match
  const filtered = categories.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.categoryCode.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    const flat = flattenCategories(filtered);
    setSelectedIds(checked ? flat.map(c => c.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} danh mục`)
        break;
      case "delete":
        toast.success(`Đã xoá ${selectedIds.length} danh mục`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo danh mục")
        break;
    }
  }

  const handleView = (item: Category) => {
    toast.info(`Xem chi tiết danh mục: ${item.name}`)
  }

  const handleEdit = (item: Category) => {
    toast.info(`Chỉnh sửa danh mục: ${item.name}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Danh mục sản phẩm</h1>
        <p className="text-sm text-slate-500 mt-1">Phân loại sản phẩm theo cấu trúc cây phân cấp</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <CategoryToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          selectedIds={selectedIds}
          onAction={handleToolbarAction}
        />
        
        {/* Data Table */}
        <CategoryTable 
          data={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
