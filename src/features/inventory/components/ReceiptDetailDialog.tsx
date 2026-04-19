import React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "../utils"
import type { StockReceipt } from "../types"
import { StatusBadge } from "./StatusBadge"
import { Package, Calendar, User, Building2, Hash, FileText, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReceiptDetailDialogProps {
  receipt: StockReceipt | null;
  isOpen: boolean;
  onClose: () => void;
  canApprove?: boolean;
}

export function ReceiptDetailDialog({ receipt, isOpen, onClose, canApprove = false }: ReceiptDetailDialogProps) {
  if (!receipt) return null;

  const handleApprove = () => alert(`Đã phê duyệt phiếu ${receipt.receiptCode} (Dữ liệu mock)`);
  const handleReject = () => alert(`Đã từ chối phiếu ${receipt.receiptCode} (Dữ liệu mock)`);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full sm:max-w-5xl lg:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-slate-200 shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={receipt.status} />
                <span className="text-xs font-mono text-slate-400">ID: #{receipt.id}</span>
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                Phiếu nhập: <span className="font-mono text-blue-600">{receipt.receiptCode}</span>
              </DialogTitle>
              <DialogDescription className="text-slate-500 mt-1">
                Tạo lúc {formatDate(receipt.createdAt)} bởi <span className="font-medium text-slate-700">{receipt.staffName}</span>
              </DialogDescription>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tổng thanh toán</p>
                    <p className="text-2xl font-black text-slate-900">{formatCurrency(receipt.totalAmount)}</p>
                </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 pt-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <DetailGridItem icon={Building2} label="Nhà cung cấp" value={receipt.supplierName} />
            <DetailGridItem icon={Calendar} label="Ngày nhập kho" value={formatDate(receipt.receiptDate)} />
            <DetailGridItem icon={Hash} label="Số hóa đơn" value={receipt.invoiceNumber || "—"} />
            <DetailGridItem icon={User} label="Người tạo" value={receipt.staffName} />
          </div>

          {/* Workflow progress */}
          <div className="mb-8 p-4 bg-white border border-slate-100 rounded-xl shadow-xs">
             <div className="flex items-center justify-between px-2">
                <WorkflowStep label="Nháp" status="completed" />
                <div className="flex-1 h-px bg-slate-100 mx-4" />
                <WorkflowStep label="Chờ duyệt" status={receipt.status === 'Draft' ? 'pending' : 'completed'} />
                <div className="flex-1 h-px bg-slate-100 mx-4" />
                <WorkflowStep label="Hoàn tất" status={receipt.status === 'Approved' ? 'completed' : 'pending'} />
             </div>
          </div>

          {/* Note section */}
          {receipt.notes && (
            <div className="mb-8 flex gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
               <FileText className="text-amber-500 shrink-0" size={18} />
               <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Ghi chú</p>
                  <p className="text-sm text-slate-700">{receipt.notes}</p>
               </div>
            </div>
          )}

          {/* Products Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-slate-400" /> 
                Danh sách hàng hóa nhập kho
                <span className="ml-2 text-sm font-normal text-slate-400">({receipt.details.length} mặt hàng)</span>
              </h3>
            </div>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[60px] text-center">STT</TableHead>
                    <TableHead>Thông tin sản phẩm</TableHead>
                    <TableHead className="text-center">Số lô</TableHead>
                    <TableHead className="text-center">Hạn sử dụng</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right font-bold w-[140px]">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receipt.details.map((detail, idx) => (
                    <TableRow key={detail.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="text-center text-slate-400 font-mono text-xs">{idx + 1}</TableCell>
                      <TableCell>
                        <p className="font-bold text-slate-900">{detail.productName}</p>
                        <p className="text-xs text-slate-500 font-mono">{detail.skuCode} · {detail.unitName}</p>
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs text-slate-600">
                        {detail.batchNumber || "—"}
                      </TableCell>
                      <TableCell className="text-center text-sm text-slate-600">
                        {detail.expiryDate ? formatDate(detail.expiryDate) : "—"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {detail.quantity} <span className="text-[10px] font-normal text-slate-500">{detail.unitName}</span>
                      </TableCell>
                      <TableCell className="text-right text-slate-600">
                        {formatCurrency(detail.costPrice)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-slate-900">
                        {formatCurrency(detail.lineTotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="mt-8 flex flex-col items-end gap-2 border-t border-slate-100 pt-6">
             <div className="flex justify-between w-full max-w-[300px] text-sm text-slate-500">
                <span>Tiền hàng (trước thuế):</span>
                <span className="font-medium text-slate-900">{formatCurrency(receipt.totalAmount)}</span>
             </div>
             <div className="flex justify-between w-full max-w-[300px] text-sm text-slate-500">
                <span>Thuế giá trị gia tăng (0%):</span>
                <span className="font-medium text-slate-900">0 ₫</span>
             </div>
             <Separator className="w-full max-w-[300px] my-2" />
             <div className="flex justify-between w-full max-w-[300px]">
                <span className="font-bold text-slate-900">Tổng cộng thanh toán:</span>
                <span className="text-xl font-black text-blue-600">{formatCurrency(receipt.totalAmount)}</span>
             </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
           {receipt.approvedByName && (
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-green-800 font-bold uppercase tracking-tight">Đã phê duyệt bởi</p>
                    <p className="text-sm font-semibold text-slate-900">{receipt.approvedByName} <span className="text-slate-400 font-normal">vào {formatDate(receipt.approvedAt!)}</span></p>
                 </div>
              </div>
           )}
           
           <div className="flex gap-3 ml-auto">
              <Button variant="outline" onClick={onClose} className="border-slate-300">Đóng</Button>
              {canApprove && receipt.status === "Pending" && (
                <>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleReject}>
                    <XCircle className="w-4 h-4 mr-2" /> Từ chối
                  </Button>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white" onClick={handleApprove}>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Duyệt phiếu
                  </Button>
                </>
              )}
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailGridItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-xs">
      <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1.5">{label}</p>
        <p className="text-sm font-semibold text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  )
}

function WorkflowStep({ label, status }: { label: string, status: 'completed' | 'pending' }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${status === 'completed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-slate-200'}`} />
            <span className={`text-xs font-bold uppercase tracking-tighter ${status === 'completed' ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
        </div>
    )
}
