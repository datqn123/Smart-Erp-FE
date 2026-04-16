import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Package } from "lucide-react"
import { mockProducts } from "../mockData"
import type { Product } from "../types"
import { ProductToolbar } from "../components/ProductToolbar"
import { ProductTable } from "../components/ProductTable"
import { toast } from "sonner"

export function ProductsPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [products] = useState(mockProducts)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => { setTitle("Quản lý sản phẩm") }, [setTitle])

  const categories = Array.from(new Set(products.map(p => p.categoryName).filter((c): c is string => Boolean(c))))

  const filtered = products.filter(p => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (categoryFilter !== "all" && p.categoryName !== categoryFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.skuCode.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(p => p.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} sản phẩm`)
        break;
      case "delete":
        toast.success(`Đã xoá ${selectedIds.length} sản phẩm`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo sản phẩm")
        break;
      case "export":
        toast.info("Đang xuất dữ liệu Excel...")
        break;
      case "import":
        fileInputRef.current?.click()
        break;
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) toast.success(`Đã chọn: ${file.name}. Đang xử lý import...`)
  }

  const handleView = (item: Product) => {
    toast.info(`Xem chi tiết sản phẩm: ${item.name}`)
  }

  const handleEdit = (item: Product) => {
    toast.info(`Chỉnh sửa sản phẩm: ${item.name}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Quản lý sản phẩm</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý danh sách sản phẩm, SKU, giá cả</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <ProductToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
          selectedIds={selectedIds}
          onAction={handleToolbarAction}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
        
        {/* Data Table */}
        <ProductTable 
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
