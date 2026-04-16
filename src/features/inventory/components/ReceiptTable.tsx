import { Package, Eye } from "lucide-react"
import { formatCurrency, formatDate } from "../utils"
import type { StockReceipt } from "../types"
import { StatusBadge } from "./StatusBadge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface ReceiptTableProps {
  receipts: StockReceipt[];
  onAction: (receipt: StockReceipt) => void;
}

export function ReceiptTableHeader() {
  return (
    <Table className="bg-slate-50 border-none border-separate border-spacing-0">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[140px]">Mã phiếu</TableHead>
          <TableHead className="min-w-[160px]">Nhà cung cấp</TableHead>
          <TableHead className="w-[110px]">Ngày nhập</TableHead>
          <TableHead className="w-[140px]">Người tạo</TableHead>
          <TableHead className="w-[120px]">Số HĐ</TableHead>
          <TableHead className="w-[90px] text-center">Dòng SP</TableHead>
          <TableHead className="w-[130px] text-right">Tổng tiền</TableHead>
          <TableHead className="w-[110px] text-center">Trạng thái</TableHead>
          <TableHead className="w-[60px] text-center sticky right-0 bg-slate-50">NV</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}

export function ReceiptTable({ receipts, onAction }: ReceiptTableProps) {
  return (
    <Table data-testid="receipt-table" className="bg-white border-none border-separate border-spacing-0">
        <TableBody>
          {receipts.map((receipt) => (
            <TableRow 
              key={receipt.id} 
              className="group hover:bg-slate-50/50 cursor-pointer"
              onClick={() => onAction(receipt)}
            >
              <TableCell className="font-mono text-xs font-semibold text-slate-900">
                {receipt.receiptCode}
              </TableCell>
              <TableCell className="text-sm text-slate-700 max-w-[200px] truncate">
                {receipt.supplierName}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {formatDate(receipt.receiptDate)}
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100 uppercase">
                    {receipt.staffName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="truncate">{receipt.staffName}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-500 italic">
                {receipt.invoiceNumber || "—"}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                  <Package className="h-3 w-3" />
                  {receipt.details.length}
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-slate-900">
                {formatCurrency(receipt.totalAmount)}
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={receipt.status} />
              </TableCell>
              <TableCell className="text-center sticky right-0 bg-white group-hover:bg-slate-50/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-slate-900"
                  data-testid="view-detail-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction(receipt);
                  }}
                  title="Xem chi tiết"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
}
