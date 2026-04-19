import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2, Trash2 } from "lucide-react"
import { 
  DATA_TABLE_ROOT_CLASS, 
  DATA_TABLE_ACTION_HEAD_CLASS, 
  DATA_TABLE_ACTION_CELL_CLASS,
  USER_TABLE_COL 
} from "@/lib/data-table-layout"
import type { Employee } from "../types"

interface EmployeeTableProps {
  data: Employee[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Employee) => void
  onEdit: (item: Employee) => void
  onDelete: (item: Employee) => void
}

export function EmployeeTable({ 
  data, 
  selectedIds, 
  onSelect, 
  onSelectAll, 
  onView, 
  onEdit,
  onDelete
}: EmployeeTableProps) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-x border-b border-slate-200/60 rounded-b-xl overflow-hidden shadow-md font-sans">
      <div className="flex-1 overflow-y-auto relative scroll-smooth [scrollbar-gutter:stable] min-h-0">
        <Table className={DATA_TABLE_ROOT_CLASS}>
          <TableHeader className="sticky top-0 z-30 bg-slate-50 border-b">
            <TableRow className="hover:bg-transparent">
              <TableHead className={`${USER_TABLE_COL.select} px-4 text-center`}>
                <Checkbox 
                  checked={allSelected ? true : someSelected ? "indeterminate" : false} 
                  onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className={`${USER_TABLE_COL.avatar} px-4`}></TableHead>
              <TableHead className={`${USER_TABLE_COL.fullName} text-sm font-semibold text-slate-900 px-4`}>Họ và tên</TableHead>
              <TableHead className={`${USER_TABLE_COL.role} text-sm font-semibold text-slate-900 px-4`}>Quyền hạn</TableHead>
              <TableHead className={`${USER_TABLE_COL.email} text-sm font-semibold text-slate-900 px-4`}>Email</TableHead>
              <TableHead className={`${USER_TABLE_COL.phone} text-sm font-semibold text-slate-900 px-4`}>Số điện thoại</TableHead>
              <TableHead className={`${USER_TABLE_COL.status} text-sm font-semibold text-slate-900 px-4`}>Trạng thái</TableHead>
              <TableHead className={DATA_TABLE_ACTION_HEAD_CLASS}>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                   <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <p className="text-sm">Không tìm thấy nhân viên nào</p>
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
                    <TableCell className="px-4">
                      <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs uppercase shadow-inner">
                        {item.avatar ? (
                           <img src={item.avatar} alt={item.fullName} className="h-full w-full rounded-full object-cover" />
                        ) : (
                           item.fullName.split(" ").slice(-2).map(n => n[0]).join("")
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">{item.fullName}</span>
                        <span className="text-xs text-slate-500 font-mono tracking-tighter">{item.employeeCode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full border",
                        item.role === 'Admin' ? "bg-red-50 text-red-700 border-red-200" :
                        item.role === 'Manager' ? "bg-blue-50 text-blue-700 border-blue-200" :
                        item.role === 'Warehouse' ? "bg-orange-50 text-orange-700 border-orange-200" :
                        "bg-slate-50 text-slate-700 border-slate-200"
                      )}>
                        {item.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 truncate">{item.email}</TableCell>
                    <TableCell className="text-sm text-slate-600 px-4 font-mono">{item.phone}</TableCell>
                    <TableCell className="px-4">
                      <Badge className={cn(
                        "text-xs font-normal border-none",
                        item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                      )}>
                        {item.status === 'Active' ? 'Đang làm' : 'Đã nghỉ'}
                      </Badge>
                    </TableCell>
                    <TableCell className={DATA_TABLE_ACTION_CELL_CLASS}>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onView(item)} title="Xem" className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Sửa" className="h-8 w-8 text-slate-500 hover:text-slate-900 transition-colors">
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

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
