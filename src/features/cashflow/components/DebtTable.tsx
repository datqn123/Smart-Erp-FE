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
  DEBT_TABLE_COL 
} from "@/lib/data-table-layout"
import { cn } from "@/lib/utils"
import type { Debt } from "../types"

interface DebtTableProps {
  data: Debt[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Debt) => void
  onEdit: (item: Debt) => void
  onDelete: (item: Debt) => void
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Cleared') return <Badge className="bg-green-50 text-green-700 text-xs border-none font-normal">Đã tất toán</Badge>;
  return <Badge className="bg-rose-50 text-rose-700 text-xs border-none font-normal">Còn nợ</Badge>;
}

function PartnerTypeBadge({ type }: { type: string }) {
  if (type === 'Customer') return <Badge className="bg-blue-50 text-blue-700 text-xs font-normal border-blue-200">Khách hàng</Badge>;
  return <Badge className="bg-purple-50 text-purple-700 text-xs font-normal border-purple-200">Nhà cung cấp</Badge>;
}

export function DebtTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit, onDelete }: DebtTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-x border-b border-slate-200/60 rounded-b-xl overflow-hidden shadow-md">
      <div className="flex-1 overflow-y-auto relative scroll-smooth [scrollbar-gutter:stable] min-h-0">
        <Table className={DATA_TABLE_ROOT_CLASS}>
          <TableHeader className="sticky top-0 z-30 bg-slate-50 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(DEBT_TABLE_COL.select, "px-4 text-center")}>
                <Checkbox 
                  checked={allSelected ? true : someSelected ? "indeterminate" : false} 
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.code, "text-sm font-semibold text-slate-900 px-4")}>Mã nợ</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.partner, "text-sm font-semibold text-slate-900 px-4")}>Đối tác</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.type, "text-sm font-semibold text-slate-900 px-4")}>Phân loại</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.total, "text-right text-sm font-semibold text-slate-900 px-4")}>Tổng nợ</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.paid, "text-right text-sm font-semibold text-slate-900 px-4")}>Đã trả</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.remaining, "text-right text-sm font-semibold text-slate-900 px-4")}>Còn lại</TableHead>
              <TableHead className={cn(DEBT_TABLE_COL.status, "text-center text-sm font-semibold text-slate-900 px-4")}>Trạng thái</TableHead>
              <TableHead className={DATA_TABLE_ACTION_HEAD_CLASS}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                    <p className="text-sm">Không tìm thấy khoản nợ nào</p>
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
                    <TableCell className="text-sm font-mono font-semibold text-slate-700 px-4">{item.debtCode}</TableCell>
                    <TableCell className="px-4">
                      <span className="text-sm font-medium text-slate-900 truncate">{item.partnerName}</span>
                    </TableCell>
                    <TableCell className="px-4">
                      <PartnerTypeBadge type={item.partnerType} />
                    </TableCell>
                    <TableCell className="text-sm text-right px-4 text-slate-700">
                      {formatCurrency(item.totalAmount)}
                    </TableCell>
                    <TableCell className="text-sm text-right px-4 text-emerald-600">
                      {formatCurrency(item.paidAmount)}
                    </TableCell>
                    <TableCell className="text-sm font-bold text-right px-4 text-rose-600">
                      {formatCurrency(item.remainingAmount)}
                    </TableCell>
                    <TableCell className="px-4 text-center">
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className={DATA_TABLE_ACTION_CELL_CLASS}>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Xem chi tiết" className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Thanh toán nợ" className="h-8 w-8 text-blue-500 hover:text-blue-700 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(item)} title="Xóa" className="h-8 w-8 text-slate-500 hover:text-red-600 transition-colors">
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
