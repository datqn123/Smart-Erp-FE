import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2 } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import type { Transaction } from "../types"

interface TransactionTableProps {
  data: Transaction[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Transaction) => void
  onEdit: (item: Transaction) => void
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Completed') return <Badge className="bg-green-50 text-green-700 text-xs border-none font-normal">Hoàn thành</Badge>;
  if (status === 'Pending') return <Badge className="bg-amber-50 text-amber-700 text-xs border-none font-normal">Chờ xử lý</Badge>;
  return <Badge className="bg-red-50 text-red-700 text-xs border-none font-normal">Đã huỷ</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  if (type === 'Income') return <Badge className="bg-emerald-50 text-emerald-700 text-xs font-normal">Thu tiền</Badge>;
  return <Badge className="bg-rose-50 text-rose-700 text-xs font-normal">Chi tiền</Badge>;
}

export function TransactionTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit }: TransactionTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="bg-white border-x border-b md:border border-slate-200 md:rounded-b-md shadow-sm h-full flex flex-col relative min-h-0 overflow-hidden flex-1">
      
      {/* Mobile Card Layout */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-4">
        {data.length === 0 ? (
           <div className="text-center py-12 text-slate-500 text-sm">Không tìm thấy giao dịch nào</div>
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
                      <p className="text-base font-medium text-slate-900 truncate">{item.transactionCode}</p>
                      <p className="text-sm text-slate-500 truncate">{item.category}</p>
                    </div>
                  </div>
                  <TypeBadge type={item.type} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm ml-8">
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Số tiền</p>
                    <p className={`text-base font-semibold ${item.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'Income' ? '+' : '-'}{formatCurrency(item.amount)}
                    </p>
                  </div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Trạng thái</p><div className="mt-1"><StatusBadge status={item.status} /></div></div>
                  <div className="col-span-2"><p className="text-slate-500 text-xs uppercase tracking-wider">Nội dung</p><p className="text-sm font-medium text-slate-900 truncate">{item.description}</p></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Ngày GD</p><p className="text-sm font-medium text-slate-900">{new Date(item.date).toLocaleDateString('vi-VN')}</p></div>
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
        <Table className="w-full min-w-[900px] border-collapse relative">
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
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Mã GD</TableHead>
              <TableHead className="w-[100px] text-sm font-semibold text-slate-900 px-4">Loại</TableHead>
              <TableHead className="w-[160px] text-sm font-semibold text-slate-900 px-4">Phân loại</TableHead>
              <TableHead className="w-[200px] text-sm font-semibold text-slate-900 px-4">Nội dung</TableHead>
              <TableHead className="w-[140px] text-right text-sm font-semibold text-slate-900 px-4">Số tiền</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Ngày GD</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] text-center text-sm font-semibold text-slate-900 px-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-slate-500 text-sm">
                  Không tìm thấy giao dịch nào.
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
                        aria-label={`Select ${item.transactionCode}`}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono text-slate-600 px-4">{item.transactionCode}</TableCell>
                    <TableCell className="px-4"><TypeBadge type={item.type} /></TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 truncate max-w-[160px]">{item.category}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 px-4 truncate max-w-[200px]">{item.description}</TableCell>
                    <TableCell className={`text-sm font-semibold text-right px-4 ${item.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'Income' ? '+' : '-'}{formatCurrency(item.amount)}
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
