import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2, Trash2 } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import { 
  DATA_TABLE_ROOT_CLASS, 
  DATA_TABLE_ACTION_HEAD_CLASS, 
  DATA_TABLE_ACTION_CELL_CLASS,
  ORDER_TABLE_COL 
} from "@/lib/data-table-layout"
import { cn } from "@/lib/utils"
import type { Order } from "../types"

interface OrderTableProps {
  data: Order[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Order) => void
  onEdit: (item: Order) => void
  onDelete: (item: Order) => void
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') return <Badge className="bg-green-50 text-green-700 text-xs border-none font-normal">Hoàn thành</Badge>;
  if (status === 'Pending') return <Badge className="bg-amber-50 text-amber-700 text-xs border-none font-normal">Chờ duyệt</Badge>;
  return <Badge className="bg-red-50 text-red-700 text-xs border-none font-normal">Đã huỷ</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  if (type === 'Wholesale') return <Badge className="bg-blue-50 text-blue-700 text-xs font-normal border-blue-200">Bán buôn</Badge>;
  if (type === 'Retail') return <Badge className="bg-purple-50 text-purple-700 text-xs font-normal border-purple-200">Bán lẻ</Badge>;
  return <Badge className="bg-slate-100 text-slate-700 text-xs font-normal border-slate-200">Trả hàng</Badge>;
}

export function OrderTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit, onDelete }: OrderTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-md">
      <div className="flex-1 overflow-y-auto relative scroll-smooth [scrollbar-gutter:stable] min-h-0">
        <Table className={DATA_TABLE_ROOT_CLASS}>
          <TableHeader className="sticky top-0 z-30 bg-slate-50 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(ORDER_TABLE_COL.select, "px-4 text-center")}>
                <Checkbox 
                  checked={allSelected ? true : someSelected ? "indeterminate" : false} 
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className={cn(ORDER_TABLE_COL.code, "text-sm font-semibold text-slate-900 px-4")}>Mã đơn</TableHead>
              <TableHead className={cn(ORDER_TABLE_COL.customer, "text-sm font-semibold text-slate-900 px-4")}>Khách hàng</TableHead>
              <TableHead className={cn(ORDER_TABLE_COL.date, "text-sm font-semibold text-slate-900 px-4")}>Ngày tạo</TableHead>
              <TableHead className={cn(ORDER_TABLE_COL.total, "text-right text-sm font-semibold text-slate-900 px-4")}>Tổng tiền</TableHead>
              <TableHead className={cn(ORDER_TABLE_COL.status, "text-center text-sm font-semibold text-slate-900 px-4")}>Trạng thái</TableHead>
              <TableHead className={DATA_TABLE_ACTION_HEAD_CLASS}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                   <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <p className="text-sm">Không tìm thấy đơn hàng nào</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TableRow key={item.id} className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-16 group`}>
                    <TableCell className="px-4 text-center">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.id)}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono font-semibold text-slate-700 px-4">{item.orderCode}</TableCell>
                    <TableCell className="px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{item.customerName}</span>
                        <TypeBadge type={item.type} />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 px-4">
                      {new Date(item.date).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-sm font-bold text-right text-slate-900 px-4">
                      {formatCurrency(item.totalAmount)}
                    </TableCell>
                    <TableCell className="px-4 text-center">
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className={DATA_TABLE_ACTION_CELL_CLASS}>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Xem chi tiết" className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Chỉnh sửa" className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(item)} title="Xóa đơn hàng" className="h-8 w-8 text-slate-500 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
