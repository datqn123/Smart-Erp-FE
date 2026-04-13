import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Users, Plus, Eye, Edit2, Search, Download, Upload, Star } from "lucide-react"
import { formatCurrency } from "@/features/inventory/utils"
import { mockCustomers } from "../mockData"
import type { Customer } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Loyalty Badge
function LoyaltyBadge({ points }: { points: number }) {
  if (points >= 500) return <Badge className="bg-blue-100 text-blue-800 text-xs"><Star className="h-3 w-3 mr-1" />{points} điểm</Badge>
  if (points >= 100) return <Badge className="bg-blue-50 text-blue-700 text-xs"><Star className="h-3 w-3 mr-1" />{points} điểm</Badge>
  return <Badge className="bg-slate-100 text-slate-500 text-xs">{points} điểm</Badge>
}

// Customer Row
function CustomerRow({ customer }: { customer: Customer }) {
  return (
    <tr className="hover:bg-slate-50/50">
      <td className="px-4 py-3 text-sm font-mono text-slate-600">{customer.customerCode}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{customer.name}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{customer.phone}</td>
      <td className="px-4 py-3 text-xs text-slate-600">{customer.email || '-'}</td>
      <td className="px-4 py-3"><LoyaltyBadge points={customer.loyaltyPoints} /></td>
      <td className="px-4 py-3 text-sm text-right text-slate-900">{customer.totalSpent ? formatCurrency(customer.totalSpent) : '-'}</td>
      <td className="px-4 py-3 text-xs text-center text-slate-600">{customer.orderCount ?? 0}</td>
      <td className="px-4 py-3">
        <Badge className={customer.status === 'Active' ? 'bg-green-50 text-green-700 text-xs' : 'bg-slate-100 text-slate-500 text-xs'}>
          {customer.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
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

// Customer Card (Mobile)
function CustomerCardMobile({ customer }: { customer: Customer }) {
  return (
    <div className="bg-white p-4 border border-slate-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{customer.name}</p>
          <p className="text-xs text-slate-500">{customer.customerCode} • {customer.phone}</p>
        </div>
        <LoyaltyBadge points={customer.loyaltyPoints} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><p className="text-slate-500">Email</p><p className="font-medium truncate">{customer.email || '-'}</p></div>
        <div><p className="text-slate-500">Tổng chi</p><p className="font-semibold">{customer.totalSpent ? formatCurrency(customer.totalSpent) : '-'}</p></div>
        <div><p className="text-slate-500">Đơn hàng</p><p className="font-semibold">{customer.orderCount ?? 0}</p></div>
        <div><p className="text-slate-500">Trạng thái</p>
          <Badge className={customer.status === 'Active' ? 'bg-green-50 text-green-700 text-xs mt-0.5' : 'bg-slate-100 text-slate-500 text-xs mt-0.5'}>
            {customer.status === 'Active' ? 'Hoạt động' : 'Ngừng'}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" className="h-8 flex-1"><Eye className="h-3.5 w-3.5 mr-1.5" /> Xem</Button>
        <Button variant="outline" size="sm" className="h-8 flex-1"><Edit2 className="h-3.5 w-3.5 mr-1.5" /> Sửa</Button>
      </div>
    </div>
  )
}

export function CustomersPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [customers] = useState(mockCustomers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => { setTitle("Khách hàng") }, [setTitle])

  const filtered = customers.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.customerCode.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search) && !(c.email && c.email.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  const handleExport = () => { alert("Export Excel sẽ được triển khai khi có API") }
  const handleImport = () => { fileInputRef.current?.click() }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn: ${file.name}. Import sẽ được triển khai khi có API`)
  }
  const handleCreate = () => { alert("Form tạo KH sẽ được triển khai") }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>Khách hàng</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý thông tin khách hàng, điểm tích lũy</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo KH</Button>
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
            <Input placeholder="Tìm theo tên, mã KH, SĐT, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            <option value="all">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Ngừng</option>
          </select>
        </div>
        <p className="text-xs text-slate-500">{filtered.length} khách hàng</p>
      </div>

      {/* Customer List */}
      <div className="block md:hidden space-y-3">
        {filtered.map(c => <CustomerCardMobile key={c.id} customer={c} />)}
      </div>
      <div className="hidden md:block bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã KH</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Tên khách hàng</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">SĐT</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Email</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Điểm TL</th>
                <th className="text-right text-xs font-medium text-slate-600 px-4 py-3">Tổng chi</th>
                <th className="text-center text-xs font-medium text-slate-600 px-4 py-3">Đơn</th>
                <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Trạng thái</th>
                <th className="text-center text-xs font-medium text-slate-600 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => <CustomerRow key={c.id} customer={c} />)}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Không tìm thấy khách hàng nào</p>
          <Button onClick={handleCreate} className="h-11 bg-slate-900 hover:bg-slate-800 text-white"><Plus className="h-4 w-4 mr-2" /> Tạo KH</Button>
        </div>
      )}
    </div>
  )
}
