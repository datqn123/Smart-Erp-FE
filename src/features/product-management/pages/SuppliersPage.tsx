import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Building2, Plus, Eye, Edit2, Search, Download, Upload } from "lucide-react"
import { mockSuppliers } from "../mockData"
import type { Supplier } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Supplier Row
function SupplierRow({ supplier }: { supplier: Supplier }) {
  return (
    <tr className="hover:bg-slate-50/50">
      <td className="px-4 py-3 text-sm font-mono text-slate-600">{supplier.supplierCode}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{supplier.name}</td>
      <td className="px-4 py-3 text-xs text-slate-600">{supplier.contactPerson || '-'}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{supplier.phone || '-'}</td>
      <td className="px-4 py-3 text-xs text-slate-600">{supplier.taxCode || '-'}</td>
      <td className="px-4 py-3">
        <Badge className={supplier.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
          {supplier.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
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

// Supplier Card (Mobile)
function SupplierCardMobile({ supplier }: { supplier: Supplier }) {
  return (
    <div className="bg-white p-4 border border-slate-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{supplier.name}</p>
          <p className="text-xs text-slate-500">{supplier.supplierCode}{supplier.contactPerson ? ` • ${supplier.contactPerson}` : ''}</p>
        </div>
        <Badge className={supplier.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
          {supplier.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><p className="text-slate-500">SĐT</p><p className="font-medium">{supplier.phone || '-'}</p></div>
        <div><p className="text-slate-500">Email</p><p className="font-medium truncate">{supplier.email || '-'}</p></div>
        <div><p className="text-slate-500">Mã thuế</p><p className="font-medium">{supplier.taxCode || '-'}</p></div>
        <div><p className="text-slate-500">Phiếu nhập</p><p className="font-semibold">{supplier.receiptCount ?? 0}</p></div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" className="h-8 flex-1"><Eye className="h-3.5 w-3.5 mr-1.5" /> Xem</Button>
        <Button variant="outline" size="sm" className="h-8 flex-1"><Edit2 className="h-3.5 w-3.5 mr-1.5" /> Sửa</Button>
      </div>
    </div>
  )
}

export function SuppliersPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [suppliers] = useState(mockSuppliers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => { setTitle("Nhà cung cấp") }, [setTitle])

  const filtered = suppliers.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.supplierCode.toLowerCase().includes(search.toLowerCase()) && !(s.phone && s.phone.includes(search))) return false
    return true
  })

  const handleExport = () => { alert("Export Excel sẽ được triển khai khi có API") }
  const handleImport = () => { fileInputRef.current?.click() }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn: ${file.name}. Import sẽ được triển khai khi có API`)
  }
  const handleCreate = () => { alert("Form tạo NCC sẽ được triển khai") }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>Nhà cung cấp</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý thông tin nhà cung cấp hàng hóa</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo NCC</Button>
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
            <Input placeholder="Tìm theo tên, mã NCC hoặc SĐT..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            <option value="all">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Ngừng</option>
          </select>
        </div>
        <p className="text-xs text-slate-500">{filtered.length} nhà cung cấp</p>
      </div>

      {/* Supplier List */}
      <div className="block md:hidden space-y-3">
        {filtered.map(s => <SupplierCardMobile key={s.id} supplier={s} />)}
      </div>
      <div className="hidden md:block bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã NCC</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Tên nhà cung cấp</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Người liên hệ</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">SĐT</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã thuế</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Trạng thái</th>
                <th className="text-center text-xs font-medium text-slate-600 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => <SupplierRow key={s.id} supplier={s} />)}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Không tìm thấy nhà cung cấp nào</p>
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo NCC</Button>
        </div>
      )}
    </div>
  )
}
