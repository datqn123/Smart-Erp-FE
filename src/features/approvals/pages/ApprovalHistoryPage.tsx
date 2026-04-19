import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { useApprovalStore } from "../store/useApprovalStore"
import { OrderTable } from "@/features/orders/components/OrderTable"
import { OrderDetailPanel } from "@/features/orders/components/OrderDetailPanel"
import { OrderToolbar } from "@/features/orders/components/OrderToolbar"
import { CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ApprovalHistoryPage() {
  const { setTitle } = usePageTitle()
  const { approvalHistory } = useApprovalStore()
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => { setTitle("Lịch sử phê duyệt") }, [setTitle])

  const filtered = approvalHistory.filter(t => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false
    if (search && !t.transactionCode.toLowerCase().includes(search.toLowerCase()) && !t.creatorName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Map to Order shape
  const displayData = filtered.map(t => ({
    id: t.id,
    orderCode: t.transactionCode,
    type: t.type as any,
    customerName: t.creatorName,
    date: t.processedDate || t.date, // Show processed date in history
    totalAmount: t.totalAmount,
    finalAmount: t.totalAmount,
    status: t.status as any,
    itemsCount: 0 
  }))

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col bg-slate-50/50">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lịch sử phê duyệt</h1>
        <p className="text-sm text-slate-500 mt-1">Tra cứu các giao dịch đã được xử lý trong quá khứ</p>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <OrderToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          selectedIds={[]}
          onAction={() => {}}
          showCreate={false}
        />
        
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-4">
          <OrderTable 
            data={displayData}
            selectedIds={[]}
            onSelect={() => {}}
            onSelectAll={() => {}}
            onView={(item) => {
              setSelectedOrder(item)
              setIsDetailOpen(true)
            }}
          />
        </div>
      </div>

      <OrderDetailPanel 
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  )
}
