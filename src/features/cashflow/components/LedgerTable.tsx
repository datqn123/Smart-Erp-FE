import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/features/inventory/utils"
import { 
  DATA_TABLE_ROOT_CLASS, 
  LEDGER_TABLE_COL 
} from "@/lib/data-table-layout"
import { cn } from "@/lib/utils"
import type { LedgerEntry } from "../types"

interface LedgerTableProps {
  data: LedgerEntry[]
}

export function LedgerTable({ data }: LedgerTableProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-x border-b border-slate-200/60 rounded-b-xl overflow-hidden shadow-md">
      <div className="flex-1 overflow-y-auto relative scroll-smooth [scrollbar-gutter:stable] min-h-0">
        <Table className={DATA_TABLE_ROOT_CLASS}>
          <TableHeader className="sticky top-0 z-30 bg-slate-50 border-b shadow-sm">
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(LEDGER_TABLE_COL.date, "text-sm font-semibold text-slate-900 px-4")}>Ngày</TableHead>
              <TableHead className={cn(LEDGER_TABLE_COL.code, "text-sm font-semibold text-slate-900 px-4")}>Số chứng từ</TableHead>
              <TableHead className={cn(LEDGER_TABLE_COL.description, "text-sm font-semibold text-slate-900 px-4")}>Diễn giải</TableHead>
              <TableHead className={cn(LEDGER_TABLE_COL.debit, "text-right text-sm font-semibold text-slate-900 px-4")}>Phát sinh Nợ</TableHead>
              <TableHead className={cn(LEDGER_TABLE_COL.credit, "text-right text-sm font-semibold text-slate-900 px-4")}>Phát sinh Có</TableHead>
              <TableHead className={cn(LEDGER_TABLE_COL.balance, "text-right text-sm font-semibold text-slate-900 px-4")}>Số dư</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                    <p className="text-sm">Chưa có dữ liệu sổ cái</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/50 h-14 group">
                  <TableCell className="text-sm text-slate-600 px-4">
                    {new Date(item.date).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-sm font-mono font-semibold text-slate-700 px-4">{item.transactionCode}</TableCell>
                  <TableCell className="px-4">
                    <span className="text-sm text-slate-900">{item.description}</span>
                  </TableCell>
                  <TableCell className="text-sm text-right px-4 text-rose-600">
                    {item.debit > 0 ? formatCurrency(item.debit) : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-right px-4 text-emerald-600">
                    {item.credit > 0 ? formatCurrency(item.credit) : "-"}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-right px-4 text-slate-900">
                    {formatCurrency(item.balance)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
