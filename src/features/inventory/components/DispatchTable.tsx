import { Eye, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "../utils";
import type { StockDispatch } from "../types";

interface DispatchTableProps {
  dispatches: StockDispatch[];
  onAction: (dispatch: StockDispatch) => void;
}

export function DispatchTableHeader() {
  return (
    <Table className="bg-slate-50 border-none border-separate border-spacing-0">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[140px]">Mã phiếu</TableHead>
          <TableHead className="w-[140px]">Mã đơn hàng</TableHead>
          <TableHead className="min-w-[160px]">Khách hàng</TableHead>
          <TableHead className="w-[110px]">Ngày xuất</TableHead>
          <TableHead className="w-[140px]">Người xuất</TableHead>
          <TableHead className="w-[100px] text-center">Số lượng</TableHead>
          <TableHead className="w-[120px] text-center">Trạng thái</TableHead>
          <TableHead className="w-[60px] text-center sticky right-0 bg-slate-50">NV</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}

export function DispatchTable({ dispatches, onAction }: DispatchTableProps) {
  return (
    <Table data-testid="dispatch-table" className="bg-white border-none border-separate border-spacing-0">
      <TableBody>
        {dispatches.map((dispatch) => (
          <TableRow 
            key={dispatch.id} 
            className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
            onClick={() => onAction(dispatch)}
          >
            <TableCell className="w-[140px] font-mono text-xs font-semibold text-slate-900">
              {dispatch.dispatchCode}
            </TableCell>
            <TableCell className="w-[140px] font-mono text-xs text-slate-600">
              {dispatch.orderCode}
            </TableCell>
            <TableCell className="min-w-[160px] text-sm font-medium">
              {dispatch.customerName}
            </TableCell>
            <TableCell className="w-[110px] text-sm text-slate-600">
              {formatDate(dispatch.dispatchDate)}
            </TableCell>
            <TableCell className="w-[140px] text-sm text-slate-600">
               <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100 uppercase">
                  {dispatch.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="truncate">{dispatch.userName}</span>
              </div>
            </TableCell>
            <TableCell className="w-[100px] text-center">
              <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                <Package className="h-3 w-3" />
                {dispatch.items.length}
              </div>
            </TableCell>
            <TableCell className="w-[120px] text-center">
              <StatusBadge status={dispatch.status} type="dispatch" />
            </TableCell>
            <TableCell className="w-[60px] text-center sticky right-0 bg-white group-hover:bg-slate-50/50">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-slate-400 hover:text-slate-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(dispatch);
                }}
                data-testid="view-detail-btn"
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
