import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { FolderTree, Plus, Eye, Edit2, Search, ChevronRight, ChevronDown } from "lucide-react"
import { mockCategories } from "../mockData"
import type { Category } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Category Row (Desktop)
function CategoryRow({ category, level, onToggle }: { category: Category; level: number; onToggle: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = category.children && category.children.length > 0

  const handleToggle = () => {
    if (hasChildren) {
      setExpanded(!expanded)
      onToggle(category.id)
    }
  }

  return (
    <>
      <tr className="hover:bg-slate-50/50">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 20}px` }}>
            {hasChildren ? (
              <button onClick={handleToggle} className="p-1 hover:bg-slate-200 rounded">
                {expanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
              </button>
            ) : (
              <span className="w-6" />
            )}
            <span className="text-sm font-mono text-slate-600">{category.categoryCode}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm font-medium text-slate-900">{category.name}</td>
        <td className="px-4 py-3 text-xs text-slate-500">{category.productCount ?? 0}</td>
        <td className="px-4 py-3 text-xs text-slate-500">{category.description || '-'}</td>
        <td className="px-4 py-3">
          <Badge className={category.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
            {category.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
          </Badge>
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2.5"><Eye className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 px-2.5"><Edit2 className="h-4 w-4" /></Button>
          </div>
        </td>
      </tr>
      {expanded && category.children?.map(child => (
        <CategoryRow key={child.id} category={child} level={level + 1} onToggle={onToggle} />
      ))}
    </>
  )
}

// Category Card (Mobile)
function CategoryCardMobile({ category, level }: { category: Category; level: number }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = category.children && category.children.length > 0

  return (
    <>
      <div className="bg-white p-4 border border-slate-200" style={{ borderLeftWidth: `${3 + level * 2}px`, borderLeftColor: level === 0 ? '#e2e8f0' : '#94a3b8' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button onClick={() => setExpanded(!expanded)} className="p-1">
                  {expanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                </button>
              )}
              <div>
                <p className="text-sm font-medium text-slate-900 truncate">{category.name}</p>
                <p className="text-xs text-slate-500">{category.categoryCode} • {category.productCount ?? 0} SP</p>
              </div>
            </div>
          </div>
          <Badge className={category.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
            {category.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
          </Badge>
        </div>
      </div>
      {expanded && category.children?.map(child => (
        <CategoryCardMobile key={child.id} category={child} level={level + 1} />
      ))}
    </>
  )
}

export function CategoriesPage() {
  const { setTitle } = usePageTitle()
  const [categories] = useState(mockCategories)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => { setTitle("Danh mục sản phẩm") }, [setTitle])

  const filtered = categories.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.categoryCode.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>Danh mục sản phẩm</h1>
          <p className="text-sm text-slate-500 mt-1">Phân loại sản phẩm theo cấu trúc cây phân cấp</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo danh mục</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Tìm theo tên hoặc mã danh mục..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            <option value="all">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Ngừng</option>
          </select>
        </div>
        <p className="text-xs text-slate-500">{filtered.length} danh mục</p>
      </div>

      {/* Category Tree */}
      <div className="block md:hidden space-y-2">
        {filtered.map(c => <CategoryCardMobile key={c.id} category={c} level={0} />)}
      </div>
      <div className="hidden md:block bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã danh mục</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Tên</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">SL SP</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mô tả</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Trạng thái</th>
                <th className="text-center text-xs font-medium text-slate-600 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => <CategoryRow key={c.id} category={c} level={0} onToggle={() => {}} />)}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <FolderTree className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Không tìm thấy danh mục nào</p>
          <Button className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo danh mục</Button>
        </div>
      )}
    </div>
  )
}
