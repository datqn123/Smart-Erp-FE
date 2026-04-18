import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockCustomers } from "../mockData"
import type { Customer } from "../types"
import { CustomerToolbar } from "../components/CustomerToolbar"
import { CustomerTable } from "../components/CustomerTable"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { toast } from "sonner"

export function CustomersPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [customers, setCustomers] = useState(mockCustomers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // State cho xóa
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)
  const [isDeletingBulk, setIsDeletingBulk] = useState(false)

  useEffect(() => { setTitle("Khách hàng") }, [setTitle])

  const filtered = customers.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.customerCode.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search) && !(c.email && c.email.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(c => c.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} khách hàng`)
        break;
      case "delete":
        setIsDeletingBulk(true)
        break;
      case "create":
        toast.info("Mở form tạo khách hàng")
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

  const handleView = (item: Customer) => {
    toast.info(`Xem chi tiết KH: ${item.name}`)
  }

  const handleEdit = (item: Customer) => {
    toast.info(`Chỉnh sửa KH: ${item.name}`)
  }

  const handleDelete = (item: Customer) => {
    setDeleteTarget(item)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      setCustomers(prev => prev.filter(c => c.id !== deleteTarget.id))
      toast.success(`Đã xóa khách hàng: ${deleteTarget.name}`)
      setDeleteTarget(null)
    }
  }

  const confirmBulkDelete = () => {
    setCustomers(prev => prev.filter(c => !selectedIds.includes(c.id)))
    toast.success(`Đã xóa ${selectedIds.length} khách hàng`)
    setSelectedIds([])
    setIsDeletingBulk(false)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Khách hàng</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thông tin khách hàng, điểm tích lũy</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <CustomerToolbar 
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
        <CustomerTable 
          data={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Confirm Deletion */}
      <ConfirmDialog 
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa khách hàng "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
      />

      <ConfirmDialog 
        open={isDeletingBulk}
        onOpenChange={setIsDeletingBulk}
        onConfirm={confirmBulkDelete}
        title="Xác nhận xóa nhiều"
        description={`Bạn có chắc chắn muốn xóa ${selectedIds.length} khách hàng đã chọn?`}
      />
    </div>
  )
}
