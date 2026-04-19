import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockOrders } from "../mockData"
import type { Order } from "../types"
import { OrderToolbar } from "../components/OrderToolbar"
import { OrderTable } from "../components/OrderTable"
import { OrderDetailPanel } from "../components/OrderDetailPanel"
import { toast } from "sonner"

export function WholesalePage() {
  const { setTitle } = usePageTitle()
  
  const [orders] = useState<Order[]>(mockOrders.filter(o => o.type === "Wholesale"))
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  useEffect(() => { setTitle("Bán buôn (B2B)") }, [setTitle])

  const filtered = orders.filter(o => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false
    if (search && !o.customerName.toLowerCase().includes(search.toLowerCase()) && !o.orderCode.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(o => o.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} đơn hàng`)
        break;
      case "delete":
        toast.success(`Đã huỷ ${selectedIds.length} đơn hàng`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo đơn hàng bán buôn")
        break;
      case "export":
        toast.info("Đang xuất dữ liệu Excel...")
        break;
    }
  }

  const handleView = (item: Order) => {
    setSelectedOrder(item)
    setIsDetailOpen(true)
  }

  const handleEdit = (item: Order) => {
    toast.info(`Chỉnh sửa đơn hàng: ${item.orderCode}`)
  }

  const handleDelete = (item: Order) => {
    toast.error(`Yêu cầu xóa đơn hàng: ${item.orderCode}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Bán buôn (B2B)</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý các đơn hàng bán buôn</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <OrderToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          selectedIds={selectedIds}
          onAction={handleToolbarAction}
        />
        
        {/* Data Table */}
        <OrderTable 
          data={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <OrderDetailPanel 
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  )
}
