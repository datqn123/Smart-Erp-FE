import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Package, Plus, Eye, Edit2, Search, Calendar, Download, Upload } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import { mockProducts } from "../mockData"
import type { Product } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Product Table Row
function ProductRow({ product }: { product: Product }) {
  return (
    <tr className="hover:bg-slate-50/50">
      <td className="px-4 py-3 text-sm font-mono text-slate-600">{product.skuCode}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{product.name}</td>
      <td className="px-4 py-3 text-xs text-slate-600">{product.categoryName || '-'}</td>
      <td className="px-4 py-3 text-sm font-semibold text-right text-slate-900">{product.currentStock ?? 0}</td>
      <td className="px-4 py-3 text-sm text-right text-slate-900">{product.currentPrice ? formatCurrency(product.currentPrice) : '-'}</td>
      <td className="px-4 py-3">
        <Badge className={product.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
          {product.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
        </Badge>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2.5"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" className="h-8 px-2.5"><Edit2 className="h-4 w-4" /></Button>
        </div>
      </td>
    </tr>
  )
}

// Product Card (Mobile)
function ProductCardMobile({ product }: { product: Product }) {
  return (
    <div className="bg-white p-4 border border-slate-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
          <p className="text-xs text-slate-500">{product.skuCode}{product.barcode ? ` • ${product.barcode}` : ''}</p>
        </div>
        <Badge className={product.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
          {product.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><p className="text-slate-500">Danh mục</p><p className="font-medium">{product.categoryName || '-'}</p></div>
        <div><p className="text-slate-500">Tồn kho</p><p className="font-semibold">{product.currentStock ?? 0}</p></div>
        <div><p className="text-slate-500">Giá bán</p><p className="font-medium">{product.currentPrice ? formatCurrency(product.currentPrice) : '-'}</p></div>
        <div><p className="text-slate-500">Cân nặng</p><p className="font-medium">{product.weight ? `${product.weight}g` : '-'}</p></div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" className="h-8 flex-1"><Eye className="h-3.5 w-3.5 mr-1.5" /> Xem</Button>
        <Button variant="outline" size="sm" className="h-8 flex-1"><Edit2 className="h-3.5 w-3.5 mr-1.5" /> Sửa</Button>
      </div>
    </div>
  )
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Active", label: "Hoạt động" },
  { value: "Inactive", label: "Ngừng" },
]

export function ProductsPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [products] = useState(mockProducts)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => { setTitle("Quản lý sản phẩm") }, [setTitle])

  const categories = Array.from(new Set(products.map(p => p.categoryName).filter(Boolean)))

  const filtered = products.filter(p => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (categoryFilter !== "all" && p.categoryName !== categoryFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.skuCode.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleExport = () => { alert("Export Excel sẽ được triển khai khi có API") }
  const handleImport = () => { fileInputRef.current?.click() }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn: ${file.name}. Import sẽ được triển khai khi có API`)
  }
  const handleCreate = () => { alert("Form tạo sản phẩm sẽ được triển khai") }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>Quản lý sản phẩm</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý danh sách sản phẩm, SKU, giá cả</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo sản phẩm</Button>
          <Button onClick={handleExport} variant="outline" className="h-11"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button onClick={handleImport} variant="outline" className="h-11"><Upload className="h-4 w-4 mr-2" /> Import</Button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Tìm theo tên hoặc mã SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            <option value="all">Tất cả danh mục</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <p className="text-xs text-slate-500">{filtered.length} sản phẩm</p>
      </div>

      {/* Product List */}
      <div className="block md:hidden space-y-3">
        {filtered.map(p => <ProductCardMobile key={p.id} product={p} />)}
      </div>
      <div className="hidden md:block bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã SKU</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Tên sản phẩm</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Danh mục</th>
                <th className="text-right text-xs font-medium text-slate-600 px-4 py-3">Tồn kho</th>
                <th className="text-right text-xs font-medium text-slate-600 px-4 py-3">Giá bán</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Trạng thái</th>
                <th className="text-center text-xs font-medium text-slate-600 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => <ProductRow key={p.id} product={p} />)}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Không tìm thấy sản phẩm nào</p>
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo sản phẩm</Button>
        </div>
      )}
    </div>
  )
}
