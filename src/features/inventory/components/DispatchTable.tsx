import { Eye, Package, Edit2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./StatusBadge"
import { formatDate } from "../utils"
import type { StockDispatch } from "../types"
import { cn } from "@/lib/utils"
import {
  DATA_TABLE_ROOT_CLASS,
  DATA_TABLE_ACTION_HEAD_CLASS,
  DATA_TABLE_ACTION_CELL_CLASS,
  DISPATCH_TABLE_COL,
} from "@/lib/data-table-layout"

interface DispatchTableProps {
  dispatches: StockDispatch[]
  onAction: (dispatch: StockDispatch) => void
  onEdit?: (dispatch: StockDispatch) => void
  onDelete?: (id: number) => void
}

/**
 * Một bảng duy nhất (thead + tbody) — class cột từ `@/lib/data-table-layout`.
 */
export function DispatchTable({ dispatches, onAction, onEdit, onDelete }: DispatchTableProps) {
  return (
    <Table data-testid="dispatch-table" className={DATA_TABLE_ROOT_CLASS}>
      <TableHeader className="sticky top-0 z-20 bg-slate-50 shadow-sm border-b">
        <TableRow className="hover:bg-transparent border-b border-slate-200">
          <TableHead className={cn(DISPATCH_TABLE_COL.dispatchCode, "bg-slate-50")}>Mã phiếu</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.orderCode, "bg-slate-50")}>Mã đơn hàng</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.customerName, "bg-slate-50")}>Khách hàng</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.dispatchDate, "bg-slate-50")}>Ngày xuất</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.userName, "bg-slate-50")}>Người xuất</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.itemCount, "text-center bg-slate-50")}>Số lượng</TableHead>
          <TableHead className={cn(DISPATCH_TABLE_COL.status, "text-center bg-slate-50")}>Trạng thái</TableHead>
          <TableHead className={DATA_TABLE_ACTION_HEAD_CLASS}>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dispatches.map((dispatch) => (
          <TableRow
            key={dispatch.id}
            className="group hover:bg-slate-50/50 transition-colors cursor-pointer h-16"
            onClick={() => onAction(dispatch)}
          >
            <TableCell
              className={cn(DISPATCH_TABLE_COL.dispatchCode, "font-mono text-xs font-semibold text-slate-900")}
            >
              {dispatch.dispatchCode}
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.orderCode, "font-mono text-xs text-slate-600")}>
              {dispatch.orderCode}
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.customerName, "text-sm font-medium truncate")}>
              {dispatch.customerName}
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.dispatchDate, "text-sm text-slate-600")}>
              {formatDate(dispatch.dispatchDate)}
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.userName, "text-sm text-slate-600")}>
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-6 w-6 shrink-0 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100 uppercase">
                  {dispatch.userName.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="truncate">{dispatch.userName}</span>
              </div>
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.itemCount, "text-center")}>
              <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                <Package className="h-3 w-3 shrink-0" />
                {dispatch.items.length}
              </div>
            </TableCell>
            <TableCell className={cn(DISPATCH_TABLE_COL.status, "text-center")}>
              <StatusBadge status={dispatch.status} type="dispatch" />
            </TableCell>
            <TableCell className={DATA_TABLE_ACTION_CELL_CLASS} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors"
                  onClick={() => onAction(dispatch)}
                  title="Xem chi tiết"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors"
                  onClick={() => onEdit?.(dispatch)}
                  title="Sửa phiếu"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-red-600 transition-colors"
                  onClick={() => onDelete?.(dispatch.id)}
                  title="Xóa phiếu"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
