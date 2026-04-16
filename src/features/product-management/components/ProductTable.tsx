import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2 } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import type { Product } from "../types"

interface ProductTableProps {
  data: Product[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Product) => void
  onEdit: (item: Product) => void
}

export function ProductTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit }: ProductTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="bg-white border-x border-b md:border border-slate-200 md:rounded-b-md shadow-sm flex flex-col relative min-h-0 overflow-hidden flex-1">
      
      {/* Mobile Card Layout (hidden on md and up) */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-4">
        {data.length === 0 ? (
           <div className="text-center py-12 text-slate-500 text-sm">Không tìm thấy sản phẩm nào</div>
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
                      <p className="text-base font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.skuCode}{item.barcode ? ` • ${item.barcode}` : ''}</p>
                    </div>
                  </div>
                  <Badge className={item.status === 'Active' ? 'bg-green-50 text-green-700 text-xs ml-2 whitespace-nowrap border-none' : 'bg-slate-100 text-slate-500 text-xs ml-2 whitespace-nowrap border-none'}>
                    {item.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm ml-8">
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Danh mục</p><p className="text-base font-medium text-slate-900">{item.categoryName || '-'}</p></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Tồn kho</p><p className="text-base font-semibold text-slate-900">{item.currentStock ?? 0}</p></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Giá bán</p><p className="text-base font-medium text-slate-900">{item.currentPrice ? formatCurrency(item.currentPrice) : '-'}</p></div>
                  <div><p className="text-slate-500 text-xs uppercase tracking-wider">Cân nặng</p><p className="text-base font-medium text-slate-900">{item.weight ? `${item.weight}g` : '-'}</p></div>
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
              <TableHead className="w-[110px] text-sm font-semibold text-slate-900 px-4">Mã SKU</TableHead>
              <TableHead className="w-[280px] text-sm font-semibold text-slate-900 px-4">Tên sản phẩm</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Danh mục</TableHead>
              <TableHead className="w-[110px] text-right text-sm font-semibold text-slate-900 px-4">Tồn kho</TableHead>
              <TableHead className="w-[140px] text-right text-sm font-semibold text-slate-900 px-4">Giá bán</TableHead>
              <TableHead className="w-[130px] text-sm font-semibold text-slate-900 px-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] text-center text-sm font-semibold text-slate-900 px-4">Thao tác</TableHead>
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
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TableRow key={item.id} className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-14`}>
                    <TableCell className="px-4 text-center">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.id)}
                        aria-label={`Select ${item.name}`}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono text-slate-600 px-4">{item.skuCode}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 px-4 truncate max-w-[280px]">{item.name}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4">{item.categoryName || '-'}</TableCell>
                    <TableCell className="text-sm font-semibold text-right text-slate-900 px-4">
                      {item.currentStock ?? 0}
                    </TableCell>
                    <TableCell className="text-sm text-right text-slate-900 px-4">
                      {item.currentPrice ? formatCurrency(item.currentPrice) : '-'}
                    </TableCell>
                    <TableCell className="px-4">
                      <Badge className={`${item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500 border-none'} text-xs font-normal border-none`}>
                        {item.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
                      </Badge>
                    </TableCell>
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
