import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit2, ChevronDown, ChevronRight } from "lucide-react"
import type { Category } from "../types"

interface CategoryTableProps {
  data: Category[]
  selectedIds: number[]
  onSelect: (id: number) => void
  onSelectAll: (checked: boolean) => void
  onView: (item: Category) => void
  onEdit: (item: Category) => void
}

function CategoryRow({ category, level, selectedIds, onSelect, onView, onEdit }: { 
  category: Category; level: number; selectedIds: number[]; 
  onSelect: (id: number) => void; onView: (item: Category) => void; onEdit: (item: Category) => void 
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = category.children && category.children.length > 0
  const isSelected = selectedIds.includes(category.id);

  const handleToggle = () => {
    if (hasChildren) {
      setExpanded(!expanded)
    }
  }

  return (
    <>
      <TableRow className={`${isSelected ? "bg-slate-50" : "hover:bg-slate-50/50"} h-14`}>
        <TableCell className="px-4 text-center">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onSelect(category.id)}
            aria-label={`Select ${category.name}`}
            className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600"
          />
        </TableCell>
        <TableCell className="px-4">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
            {hasChildren ? (
              <button onClick={handleToggle} className="p-1 hover:bg-slate-200 rounded">
                {expanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
              </button>
            ) : (
              <span className="w-6" />
            )}
            <span className="text-sm font-mono text-slate-600">{category.categoryCode}</span>
          </div>
        </TableCell>
        <TableCell className="text-sm font-medium text-slate-900 px-4">{category.name}</TableCell>
        <TableCell className="text-sm text-slate-600 px-4">{category.productCount ?? 0}</TableCell>
        <TableCell className="text-sm text-slate-600 px-4 truncate max-w-[200px]">{category.description || '-'}</TableCell>
        <TableCell className="px-4">
          <Badge className={`${category.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'} text-xs font-normal border-none`}>
            {category.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
          </Badge>
        </TableCell>
        <TableCell className="text-center px-4">
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onView(category)} title="Xem chi tiết" className="h-8 w-8 text-slate-500 hover:text-slate-900">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onEdit(category)} title="Chỉnh sửa" className="h-8 w-8 text-slate-500 hover:text-slate-900">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && category.children?.map(child => (
        <CategoryRow key={child.id} category={child} level={level + 1} selectedIds={selectedIds} onSelect={onSelect} onView={onView} onEdit={onEdit} />
      ))}
    </>
  )
}

function CategoryCardMobile({ category, level, selectedIds, onSelect, onView, onEdit }: { 
  category: Category; level: number; selectedIds: number[]; 
  onSelect: (id: number) => void; onView: (item: Category) => void; onEdit: (item: Category) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = category.children && category.children.length > 0
  const isSelected = selectedIds.includes(category.id);

  return (
    <>
      <div className={`p-4 border ${isSelected ? 'border-slate-800 bg-slate-50' : 'border-slate-200 bg-white'}`} style={{ borderLeftWidth: `${4 + level * 4}px`, borderLeftColor: level === 0 ? '#cbd5e1' : '#94a3b8', marginLeft: `${level * 8}px` }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Checkbox 
              id={`mob-cb-${category.id}`} 
              checked={isSelected} 
              onCheckedChange={() => onSelect(category.id)} 
              className="h-5 w-5 rounded-sm border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-blue-600 data-[state=checked]:border-blue-600" 
            />
            <div className="flex-1 min-w-0 flex items-center gap-2">
              {hasChildren && (
                <button onClick={() => setExpanded(!expanded)} className="p-1 shrink-0">
                  {expanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                </button>
              )}
              <div className="min-w-0">
                <p className="text-base font-medium text-slate-900 truncate">{category.name}</p>
                <p className="text-sm text-slate-500">{category.categoryCode} • {category.productCount ?? 0} SP</p>
              </div>
            </div>
          </div>
          <Badge className={category.status === 'Active' ? 'bg-green-50 text-green-700 text-xs ml-2 whitespace-nowrap border-none' : 'bg-slate-100 text-slate-500 text-xs ml-2 whitespace-nowrap border-none'}>
            {category.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
          </Badge>
        </div>
        <div className="flex gap-2 ml-8">
          <Button variant="outline" size="sm" className="h-11 flex-1" onClick={() => onView(category)}><Eye className="h-4 w-4 mr-1.5" /> Xem</Button>
          <Button variant="outline" size="sm" className="h-11 flex-1" onClick={() => onEdit(category)}><Edit2 className="h-4 w-4 mr-1.5" /> Sửa</Button>
        </div>
      </div>
      {expanded && category.children?.map(child => (
        <CategoryCardMobile key={child.id} category={child} level={level + 1} selectedIds={selectedIds} onSelect={onSelect} onView={onView} onEdit={onEdit} />
      ))}
    </>
  )
}

// Flat list for "select all"
function flattenCategories(categories: Category[]): Category[] {
  let result: Category[] = [];
  categories.forEach(c => {
    result.push(c);
    if (c.children) {
      result = result.concat(flattenCategories(c.children));
    }
  });
  return result;
}

export function CategoryTable({ data, selectedIds, onSelect, onSelectAll, onView, onEdit }: CategoryTableProps) {
  const flatData = flattenCategories(data);
  const allSelected = flatData.length > 0 && selectedIds.length === flatData.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < flatData.length;

  return (
    <div className="bg-white border-x border-b md:border border-slate-200 md:rounded-b-md shadow-sm h-full flex flex-col relative min-h-0 overflow-hidden flex-1">
      
      {/* Mobile Card Layout */}
      <div className="md:hidden flex-1 overflow-y-auto p-4 space-y-2">
        {data.length === 0 ? (
           <div className="text-center py-12 text-slate-500 text-sm">Không tìm thấy danh mục nào</div>
        ) : (
          data.map(item => (
            <CategoryCardMobile key={item.id} category={item} level={0} selectedIds={selectedIds} onSelect={onSelect} onView={onView} onEdit={onEdit} />
          ))
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block flex-1 min-h-0 overflow-auto">
        <Table className="w-full min-w-[800px] border-collapse relative">
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
              <TableHead className="w-[180px] text-sm font-semibold text-slate-900 px-4">Mã phân loại</TableHead>
              <TableHead className="w-[240px] text-sm font-semibold text-slate-900 px-4">Tên danh mục</TableHead>
              <TableHead className="w-[100px] text-sm font-semibold text-slate-900 px-4">SL SP</TableHead>
              <TableHead className="w-[200px] text-sm font-semibold text-slate-900 px-4">Mô tả</TableHead>
              <TableHead className="w-[120px] text-sm font-semibold text-slate-900 px-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] text-center text-sm font-semibold text-slate-900 px-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500 text-sm">
                  Không tìm thấy danh mục nào.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <CategoryRow key={item.id} category={item} level={0} selectedIds={selectedIds} onSelect={onSelect} onView={onView} onEdit={onEdit} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
