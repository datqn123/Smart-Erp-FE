import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2 } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import type { Order } from "../types"

interface OrderTableProps {
  data: Order[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Order) => void
  onEdit: (item: Order) => void
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') return <Badge className="bg-green-50 text-green-700 text-xs border-none font-normal">Hoàn thành</Badge>;
  if (status === 'Pending') return <Badge className="bg-amber-50 text-amber-700 text-xs border-none font-normal">Chờ duyệt</Badge>;
  return <Badge className="bg-red-50 text-red-700 text-xs border-none font-normal">Đã huỷ</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  if (type === 'Wholesale') return <Badge className="bg-blue-50 text-blue-700 text-xs font-normal">Bán buôn</Badge>;
  if (type === 'Retail') return <Badge className="bg-purple-50 text-purple-700 text-xs font-normal">Bán lẻ</Badge>;
  return <Badge className="bg-slate-100 text-slate-700 text-xs font-normal">Trả hàng</Badge>;
}

export function OrderTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit }: OrderTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="bg-white border-x border-b md:border border-slate-200 md:rounded-b-md shadow-sm h-full flex flex-col relative min-h-0 overflow-hidden flex-1">
      
      {/* Mobile Card Layout */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-4">
        {data.length === 0 ? (
           <div className="text-center py-12 text-slate-500 text-sm">Không tìm thấy đơn hàng nào</div>
        ) : (
          data.map(item => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div key={item.id} className={`p-4 border rounded-lg ${isSelected ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Checkbox 
                      id={`mob-cb-${item.id}`} 
                      checked={isSelected} 
                      onCheckedChange={() => onSelect(item.id)} 
                      className="h-5 w-5 rounded-sm border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-slate-900 truncate">{item.orderCode}</p>
                      <p className="text-sm text-slate-500 truncate">{item.customerName}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm ml-8">
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Tổng tiền</p><p className="text-base font-semibold text-slate-900">{formatCurrency(item.totalAmount)}</p></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Trạng thái</p><div className="mt-1"><StatusBadge status={item.status} /></div></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Phân loại</p><div className="mt-1"><TypeBadge type={item.type} /></div></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Ngày tạo</p><p className="text-sm font-medium text-slate-900">{new Date(item.date).toLocaleDateString('vi-VN')}</p></div>
                </div>
                <div className="flex gap-2 ml-8">
                  <Button variant="outline" size="sm" className="h-11 flex-1" onClick={() => onView(item)}><Eye className="h-4 w-4 mr-1.5" /> Xem</Button>
                  <Button variant="outline" size="sm" className="h-11 flex-1" onClick={() => onEdit(item)}><Edit2 className="h-4 w-4 mr-1.5" /> Sửa</Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block flex-1 min-h-0 overflow-auto">
        <Table className="w-full min-w-[800px] border-collapse relative">
          <TableHeader className="sticky top-0 z-30 bg-slate-50 shadow-sm border-b">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="w-[48px] px-4 text-center">
                <Checkbox 
                  checked={allSelected ? true : someSelected ? "indeterminate" : false} 
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  aria-label="Select all"
                  className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Mã đơn</TableHead>
              <TableHead className="w-[200px] text-sm font-semibold text-slate-900 px-4">Tên khách hàng</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Loại đơn</TableHead>
              <TableHead className="w-[160px] text-right text-sm font-semibold text-slate-900 px-4">Tổng tiền</TableHead>
              <TableHead className="w-[140px] text-sm font-semibold text-slate-900 px-4">Ngày tạo</TableHead>
              <TableHead className="w-[140px] text-sm font-semibold text-slate-900 px-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] text-center text-sm font-semibold text-slate-900 px-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500 text-sm">
                  Không tìm thấy đơn hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TableRow key={item.id} className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-14`}>
                    <TableCell className="px-4 text-center">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.id)}
                        aria-label={`Select ${item.orderCode}`}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono text-slate-600 px-4">{item.orderCode}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 px-4 truncate max-w-[200px]">{item.customerName}</TableCell>
                    <TableCell className="px-4"><TypeBadge type={item.type} /></TableCell>
                    <TableCell className="text-sm font-semibold text-right text-slate-900 px-4">
                      {formatCurrency(item.totalAmount)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 px-4">{new Date(item.date).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="px-4"><StatusBadge status={item.status} /></TableCell>
                    <TableCell className="text-center px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Xem chi tiết" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Chỉnh sửa" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Edit2 className="h-4 w-4" />
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
