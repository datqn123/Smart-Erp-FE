import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { useApprovalStore } from "../store/useApprovalStore"
import { OrderTable } from "@/features/orders/components/OrderTable"
import { OrderDetailPanel } from "@/features/orders/components/OrderDetailPanel"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { ApprovalTransaction } from "../types"

export default function PendingApprovalsPage() {
  const { setTitle } = usePageTitle()
  const { pendingTransactions, approveTransaction, rejectTransaction } = useApprovalStore()
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [rejectId, setRejectId] = useState<number | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => { setTitle("Chờ phê duyệt") }, [setTitle])

  const handleApprove = (id: number) => {
    approveTransaction(id)
    toast.success("Đã phê duyệt giao dịch thành công!")
  }

  const handleRejectClick = (id: number) => {
    setRejectId(id)
    setRejectionReason("")
  }

  const confirmReject = () => {
    if (!rejectionReason) {
      toast.error("Vui lòng nhập lý do từ chối")
      return
    }
    if (rejectId) {
      rejectTransaction(rejectId, rejectionReason)
      toast.error("Đã từ chối giao dịch")
      setRejectId(null)
    }
  }

  // Map ApprovalTransaction to Order shape for the table/panel
  const displayData = pendingTransactions.map(t => ({
    id: t.id,
    orderCode: t.transactionCode,
    type: t.type as any,
    customerName: t.creatorName, // In approvals, we highlight the creator
    date: t.date,
    totalAmount: t.totalAmount,
    finalAmount: t.totalAmount, // Mock same as total for now
    status: t.status as any,
    itemsCount: 0 
  }))

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 h-full flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chờ phê duyệt</h1>
          <p className="text-sm text-slate-500 mt-1">Danh sách các giao dịch đang chờ Chủ cửa hàng xét duyệt</p>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-bold text-amber-700">{pendingTransactions.length} Giao dịch cần duyệt</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-y-auto custom-scrollbar">
          <OrderTable 
            data={displayData}
            selectedIds={[]}
            onSelect={() => {}}
            onSelectAll={() => {}}
            onView={(item) => {
              setSelectedOrder(item)
              setIsDetailOpen(true)
            }}
            renderCustomActions={(item) => (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => handleApprove(item.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRejectClick(item.id)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          />
        </div>
      </div>

      {/* Reject Reason Dialog */}
      <Dialog open={rejectId !== null} onOpenChange={() => setRejectId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Từ chối giao dịch</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Lý do từ chối (Bắt buộc)</label>
              <Input 
                placeholder="VD: Sai thông tin hóa đơn, sai số lượng..." 
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
              * Lưu ý: Lý do này sẽ được gửi thông báo trực tiếp đến nhân viên tạo đơn.
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRejectId(null)}>Hủy</Button>
            <Button variant="destructive" onClick={confirmReject}>Xác nhận từ chối</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <OrderDetailPanel 
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  )
}
