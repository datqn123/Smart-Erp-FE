import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import type { InventoryItem } from "../types"

interface StockTableProps {
  data: InventoryItem[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onViewDetails: (item: InventoryItem) => void
}

export function StockTable({ data, selectedIds, onSelect, onSelectAll, onViewDetails }: StockTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const getStatusInfo = (item: InventoryItem) => {
    if (item.quantity === 0) return { label: "Hết hàng", bg: "bg-red-100 text-red-800" }
    if (item.isLowStock) return { label: "Sắp hết", bg: "bg-red-50 text-red-700 hover:bg-red-100" }
    if (item.isExpiringSoon) return { label: "Cận date", bg: "bg-amber-50 text-amber-700 hover:bg-amber-100" }
    return { label: "Còn hàng", bg: "bg-green-50 text-green-700 hover:bg-green-100" }
  };

  return (
    <div className="bg-white border-x border-b md:border border-slate-200 md:rounded-b-md shadow-sm h-full flex flex-col relative min-h-0 overflow-hidden">
      
      {/* Mobile Card Layout (hidden on md and up) */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-4">
        {data.length === 0 ? (
           <div className="text-center py-12 text-slate-500 text-sm">Không tìm thấy sản phẩm nào</div>
        ) : (
          data.map(item => {
            const status = getStatusInfo(item);
            const isSelected = selectedIds.includes(item.id);
            return (
              <div key={item.id} className={`p-4 border rounded-lg ${isSelected ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Checkbox id={`mob-cb-${item.id}`} checked={isSelected} onCheckedChange={() => onSelect(item.id)} className="h-5 w-5 rounded-sm border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-slate-900 truncate">{item.productName}</p>
                      <p className="text-sm text-slate-500">{item.skuCode}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${status.bg} text-xs ml-2 whitespace-nowrap`}>{status.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm ml-8">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Tồn kho</p>
                    <p className="text-base font-semibold text-slate-900">{item.quantity} {item.unitName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Vị trí</p>
                    <p className="text-base font-medium text-slate-900">{item.warehouseCode}-{item.shelfCode}</p>
                  </div>
                </div>
                <div className="ml-8">
                  <Button variant="outline" size="sm" className="w-full h-11" onClick={() => onViewDetails(item)}>
                    <Eye className="mr-2 h-4 w-4" /> Chi tiết lô hàng
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block flex-1 min-h-0 overflow-auto">
        <Table className="w-full min-w-[1000px] border-collapse relative">
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
              <TableHead className="w-[110px] text-sm font-semibold text-slate-900 px-4">Mã SP</TableHead>
              <TableHead className="w-[280px] text-sm font-semibold text-slate-900 px-4">Tên sản phẩm</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Vị trí</TableHead>
              <TableHead className="w-[110px] text-right text-sm font-semibold text-slate-900 px-4">Tồn kho</TableHead>
              <TableHead className="w-[140px] text-sm font-semibold text-slate-900 px-4">Hạn SD</TableHead>
              <TableHead className="w-[130px] text-sm font-semibold text-slate-900 px-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] text-right text-sm font-semibold text-slate-900 px-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500 text-sm">
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const status = getStatusInfo(item);
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TableRow key={item.id} className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-14`}>
                    <TableCell className="px-4 text-center">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.id)}
                        aria-label={`Select ${item.productName}`}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono text-slate-600 px-4">{item.skuCode}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 px-4 truncate max-w-[280px]">{item.productName}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4">
                      <Badge variant="outline" className="text-xs font-normal border-slate-200 h-6">{item.warehouseCode}-{item.shelfCode}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-right text-slate-900 px-4">
                      {item.quantity} <span className="text-xs font-normal text-slate-500">{item.unitName}</span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 px-4">
                      {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('vi-VN') : '-'}
                    </TableCell>
                    <TableCell className="px-4">
                      <Badge variant="secondary" className={`${status.bg} text-xs font-normal border-none`}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right px-4">
                      <Button variant="ghost" size="icon" onClick={() => onViewDetails(item)} title="Xem chi tiết" className="h-9 w-9 text-slate-500 hover:text-slate-900">
                        <Eye className="h-5 w-5" />
                      </Button>
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
