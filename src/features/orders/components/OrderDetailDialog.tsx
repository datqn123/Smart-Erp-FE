import React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { formatDate } from "../../inventory/utils"
import type { Order, OrderItem } from "../types"
import { ShoppingBag, User, Calendar, Activity, CreditCard, Receipt, MapPin, Package, Trash2, Edit, CheckCircle2, Truck, Timer, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "../../inventory/components/StatusBadge"
import { cn } from "@/lib/utils"

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock items for detail display
const mockOrderItems: OrderItem[] = [
    { id: 1, productId: 101, productName: "Sơn Mykolor Grand", skuCode: "MK-001", quantity: 5, unitName: "Thùng", unitPrice: 1250000, lineTotal: 6250000 },
    { id: 2, productId: 102, productName: "Sơn Dulux 5in1", skuCode: "DX-002", quantity: 3, unitName: "Thùng", unitPrice: 1550000, lineTotal: 4650000 },
]

export function OrderDetailDialog({ order, isOpen, onClose }: OrderDetailDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full sm:max-w-5xl lg:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={order.status} />
                <span className="text-xs font-mono text-slate-400">Order Ref: {order.orderCode}</span>
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                Đơn hàng {order.type === "Wholesale" ? "Bán buôn" : "Bán lẻ"} 
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                <User size={14} /> Khách hàng: <span className="font-bold text-slate-900">{order.customerName}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-right border-r pr-4 border-slate-100">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Thanh toán</p>
                    <p className={cn(
                        "text-sm font-black",
                        order.paymentStatus === "Paid" ? "text-green-600" : "text-amber-500"
                    )}>{order.paymentStatus}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tổng thanh toán</p>
                    <p className="text-2xl font-black text-slate-900">{order.finalAmount.toLocaleString()} <span className="text-sm font-normal text-slate-400">đ</span></p>
                </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 pt-6">
          {/* Progress Tracker (Premium Feel) */}
          <div className="mb-10 pt-4">
              <div className="flex justify-between relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                  <div className={cn("absolute top-1/2 left-0 h-0.5 bg-slate-900 -translate-y-1/2 z-0 transition-all duration-700", 
                    order.status === "Pending" ? "w-0" : 
                    order.status === "Processing" ? "w-1/3" : 
                    order.status === "Shipped" ? "w-2/3" : "w-full"
                  )} />
                  <Step icon={Timer} label="Tiếp nhận" active />
                  <Step icon={Activity} label="Xử lý" active={["Processing", "Shipped", "Delivered", "Completed"].includes(order.status)} />
                  <Step icon={Truck} label="Giao hàng" active={["Shipped", "Delivered", "Completed"].includes(order.status)} />
                  <Step icon={CheckCircle2} label="Hoàn tất" active={["Delivered", "Completed"].includes(order.status)} />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
                <SectionHeader icon={Receipt} title="Thông tin chung" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Ngày lập đơn</p>
                        <p className="text-sm font-bold text-slate-900">{formatDate(order.date)}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Số lượng SKU</p>
                        <p className="text-sm font-bold text-slate-900">{order.itemsCount} loại</p>
                    </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <MapPin size={12} /> Địa chỉ giao hàng
                    </p>
                    <p className="text-sm text-slate-700 font-medium">123 Đường ABC, Quận X, TP. Hồ Chí Minh</p>
                </div>
            </div>

            <div className="space-y-4">
                <SectionHeader icon={Package} title="Danh sách sản phẩm" />
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 font-bold text-slate-400 text-[10px] uppercase tracking-wider">Sản phẩm</th>
                                <th className="p-3 font-bold text-slate-400 text-[10px] uppercase tracking-wider text-right">SL</th>
                                <th className="p-3 font-bold text-slate-400 text-[10px] uppercase tracking-wider text-right">Tổng</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockOrderItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="p-3">
                                        <p className="font-bold text-slate-900">{item.productName}</p>
                                        <p className="text-[10px] text-slate-400 font-mono italic">{item.skuCode}</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <span className="font-bold text-slate-900">{item.quantity}</span>
                                        <span className="text-xs text-slate-400 ml-1">{item.unitName}</span>
                                    </td>
                                    <td className="p-3 text-right font-black text-slate-900">
                                        {item.lineTotal.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
                    <div className="flex justify-between items-center mb-1 opacity-60 text-[10px] uppercase tracking-widest font-bold">
                        <span>Tạm tính</span>
                        <span>{order.totalAmount.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-3 text-red-400 text-[10px] uppercase tracking-widest font-bold">
                        <span>Giảm giá / Ưu đãi</span>
                        <span>-{order.discountAmount?.toLocaleString() || 0} đ</span>
                    </div>
                    <Separator className="bg-white/10 mb-3" />
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Tổng cộng</span>
                        <span className="text-xl font-black">{order.finalAmount.toLocaleString()} đ</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between gap-3">
           <div className="flex gap-2">
               <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <XCircle size={16} className="mr-2" /> Hủy đơn
               </Button>
           </div>
           <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="px-6 border-slate-300">Đóng</Button>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 shadow-lg shadow-slate-200">
                    <Edit size={16} className="mr-2" /> Chỉnh sửa
                </Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: any, title: string }) {
    return (
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
            <Icon size={14} className="text-slate-400" /> {title}
        </h3>
    )
}

function Step({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-2 relative z-10 group">
            <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                active 
                    ? "bg-slate-900 border-slate-900 text-white shadow-[0_0_15px_rgba(15,23,42,0.3)] scale-110" 
                    : "bg-white border-slate-100 text-slate-300"
            )}>
                <Icon size={18} />
            </div>
            <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                active ? "text-slate-900" : "text-slate-300"
            )}>{label}</span>
        </div>
    )
}
