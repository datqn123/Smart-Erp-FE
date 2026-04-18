import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2, Trash2 } from "lucide-react"
import { 
  DATA_TABLE_ROOT_CLASS, 
  DATA_TABLE_ACTION_HEAD_CLASS, 
  DATA_TABLE_ACTION_CELL_CLASS,
  SUPPLIER_TABLE_COL 
} from "@/lib/data-table-layout"
import type { Supplier } from "../types"

interface SupplierTableProps {
  data: Supplier[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Supplier) => void
  onEdit: (item: Supplier) => void
  onDelete: (item: Supplier) => void
}

export function SupplierTable({ 
  data, 
  selectedIds, 
  onSelect, 
  onSelectAll, 
  onView, 
  onEdit,
  onDelete
}: SupplierTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-md">
      {/* Scrollable Container (One Scroll Area) */}
      <div className="flex-1 overflow-y-auto relative scroll-smooth [scrollbar-gutter:stable] min-h-0">
        
        {/* Table View */}
        <Table className={DATA_TABLE_ROOT_CLASS}>
          <TableHeader className="sticky top-0 z-30 bg-slate-50 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className={`${SUPPLIER_TABLE_COL.select} px-4 text-center`}>
                <Checkbox 
                  checked={allSelected ? true : someSelected ? "indeterminate" : false} 
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.code} text-sm font-semibold text-slate-900 px-4`}>Mã NCC</TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.name} text-sm font-semibold text-slate-900 px-4`}>Nhà cung cấp</TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.contact} text-sm font-semibold text-slate-900 px-4`}>Người liên hệ</TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.email} text-sm font-semibold text-slate-900 px-4`}>Email</TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.address} text-sm font-semibold text-slate-900 px-4 text-right`}>Địa chỉ</TableHead>
              <TableHead className={`${SUPPLIER_TABLE_COL.status} text-sm font-semibold text-slate-900 px-4`}>Trạng thái</TableHead>
              <TableHead className={DATA_TABLE_ACTION_HEAD_CLASS}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500 text-sm">
                  Không tìm thấy nhà cung cấp nào.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TableRow key={item.id} className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-14 group`}>
                    <TableCell className="px-4 text-center">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => onSelect(item.id)}
                        className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </TableCell>
                    <TableCell className="text-sm font-mono text-slate-600 px-4">{item.supplierCode}</TableCell>
                    <TableCell className="text-sm font-medium text-slate-900 px-4 truncate">{item.name}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 truncate">{item.contactPerson || '-'}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 truncate">{item.email || '-'}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 truncate">{item.address || '-'}</TableCell>
                    <TableCell className="px-4">
                      <Badge className={`${item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'} text-xs font-normal border-none`}>
                        {item.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
                      </Badge>
                    </TableCell>
                    <TableCell className={DATA_TABLE_ACTION_CELL_CLASS}>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Xem chi tiết" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Chỉnh sửa" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(item)} title="Xóa" className="h-8 w-8 text-slate-500 hover:text-red-600">
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
