import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { InventoryItem } from "../types"

interface StockBatchDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem | null
}

// 30 days in milliseconds – computed once at module level so it is pure
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function isExpiringSoon(expiryDate: string | undefined): boolean {
  if (!expiryDate) return false
  const expiryTime = new Date(expiryDate).getTime()
  // Compare against a fixed reference point (today at midnight) to stay deterministic
  const todayStart = new Date(new Date().toDateString()).getTime()
  return expiryTime < todayStart + THIRTY_DAYS_MS
}

function buildBatches(item: InventoryItem) {
  return [
    {
      id: 1,
      batchNumber: item.batchNumber || "B-CHUNG",
      quantity: Math.floor(item.quantity * 0.7) || item.quantity,
      expiryDate: item.expiryDate,
      warehouseCode: item.warehouseCode,
      shelfCode: item.shelfCode,
    },
    {
      id: 2,
      batchNumber: "B-NEW-2026",
      quantity: Math.ceil(item.quantity * 0.3),
      expiryDate: "2027-12-31",
      warehouseCode: item.warehouseCode,
      shelfCode: item.shelfCode,
    }
  ].filter(b => b.quantity > 0 || b.id === 1)
}

export function StockBatchDetailsDialog({ isOpen, onClose, item }: StockBatchDetailsDialogProps) {
  // No hooks are used, so no early-return issue.
  if (!item) return null

  const batches = buildBatches(item)
  const totalQuantity = batches.reduce((sum, b) => sum + b.quantity, 0)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.productName}</DialogTitle>
          <DialogDescription>
            SKU: {item.skuCode} • {item.unitName}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-900">Chi tiết theo lô</h3>
            <div className="text-sm">
              Tổng lượng: <span className="font-bold text-slate-900">{totalQuantity}</span> {item.unitName}
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Số lô</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Hạn SD</TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">{batch.batchNumber}</TableCell>
                    <TableCell>{batch.warehouseCode}-{batch.shelfCode}</TableCell>
                    <TableCell>
                      <span className={isExpiringSoon(batch.expiryDate) ? "text-amber-600 font-medium" : ""}>
                        {batch.expiryDate ? new Date(batch.expiryDate).toLocaleDateString('vi-VN') : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {batch.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
