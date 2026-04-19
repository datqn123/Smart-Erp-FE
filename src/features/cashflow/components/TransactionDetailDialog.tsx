import React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/features/inventory/utils"
import { Calendar, Tag, FileText, Banknote, Clock, User, ArrowUpCircle, ArrowDownCircle, CheckCircle2, XCircle, Timer, Wallet } from "lucide-react"
import type { Transaction } from "../types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TransactionDetailDialogProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
}

export function TransactionDetailDialog({ transaction, isOpen, onClose }: TransactionDetailDialogProps) {
  if (!transaction) return null

  const isIncome = transaction.type === 'Income'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full sm:max-w-3xl lg:max-w-3xl p-0 overflow-hidden border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                  transaction.status === 'Completed' ? "bg-green-50 text-green-700 border-green-100" :
                  transaction.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                  "bg-red-50 text-red-700 border-red-100"
                )}>
                  {transaction.status === 'Completed' ? 'Hoàn thành' : transaction.status === 'Pending' ? 'Chờ duyệt' : 'Đã hủy'}
                </span>
                <span className="text-xs font-mono text-slate-400">Ref: {transaction.transactionCode}</span>
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                {isIncome ? "Phiếu thu tiền" : "Phiếu chi tiền"}
              </DialogTitle>
              <DialogDescription className="text-slate-500 mt-1 flex items-center gap-2">
                <Tag size={14} className="text-slate-300" />
                Dòng tiền: <span className="font-bold text-slate-900">{transaction.category}</span>
              </DialogDescription>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-md">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100">
                   {isIncome ? <ArrowUpCircle className="text-emerald-500" size={28} /> : <ArrowDownCircle className="text-rose-500" size={28} />}
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Giá trị giao dịch</p>
                    <p className={cn(
                        "text-2xl font-black tracking-tight",
                        isIncome ? "text-emerald-600" : "text-rose-600"
                    )}>
                        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 pt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                            <Clock size={14} /> Thời gian & Đối chiếu
                        </h3>
                        <div className="space-y-3">
                            <InfoRow icon={Calendar} label="Ngày giao dịch" value={new Date(transaction.date).toLocaleDateString('vi-VN')} />
                            <InfoRow icon={Timer} label="Giờ phát sinh" value={new Date(transaction.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} />
                            <InfoRow icon={Wallet} label="Phương thức" value="Chuyển khoản / Tiền mặt" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                            <FileText size={14} /> Diễn giải chi tiết
                        </h3>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 min-h-[100px] text-sm text-slate-700 leading-relaxed italic">
                            {transaction.description || "Không có nội dung diễn giải đi kèm cho giao dịch này."}
                        </div>
                    </div>
                </div>
           </div>

           <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <CheckCircle2 size={16} />
                </div>
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    Giao dịch này được tạo tự động từ hệ thống đối soát đơn hàng. Tất cả các thay đổi được ghi nhật ký vào Log giao dịch để đảm bảo tính minh bạch.
                </p>
           </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="px-6 border-slate-300">Đóng</Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 shadow-lg shadow-slate-200">
                In phiếu thu/chi
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-2 text-slate-500">
                <Icon size={14} />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{value}</span>
        </div>
    )
}
