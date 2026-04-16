import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockSuppliers } from "../mockData"
import type { Supplier } from "../types"
import { SupplierToolbar } from "../components/SupplierToolbar"
import { SupplierTable } from "../components/SupplierTable"
import { toast } from "sonner"

export function SuppliersPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [suppliers] = useState(mockSuppliers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => { setTitle("Nhà cung cấp") }, [setTitle])

  const filtered = suppliers.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.supplierCode.toLowerCase().includes(search.toLowerCase()) && !(s.phone && s.phone.includes(search))) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(s => s.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} nhà cung cấp`)
        break;
      case "delete":
        toast.success(`Đã xoá ${selectedIds.length} nhà cung cấp`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo nhà cung cấp")
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

  const handleView = (item: Supplier) => {
    toast.info(`Xem chi tiết NCC: ${item.name}`)
  }

  const handleEdit = (item: Supplier) => {
    toast.info(`Chỉnh sửa NCC: ${item.name}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Nhà cung cấp</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thông tin nhà cung cấp hàng hóa</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <SupplierToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          selectedIds={selectedIds}
          onAction={handleToolbarAction}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
        
        {/* Data Table */}
        <SupplierTable 
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
