import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Package, AlertTriangle, CalendarClock, TrendingUp } from "lucide-react"
import { formatCurrency } from "../utils"
import { mockInventory, mockInventoryKPIs } from "../mockData"
import type { InventoryItem, InventoryFilters } from "../types"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// KPI Card Component
function KPICard({ title, value, icon, color }: {
  title: string; value: string; icon: React.ReactNode; color: string
}) {
  return (
    <div className="bg-white p-4 md:p-5 flex items-start gap-3">
      <div className={`p-2.5 ${color} flex-shrink-0`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 mb-1">{title}</p>
        <p className="text-lg font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  )
}

// Mobile Inventory Card
function InventoryCardMobile({ item }: { item: InventoryItem }) {
  const getStatusInfo = () => {
    if (item.quantity === 0) return { label: "Hết hàng", bg: "bg-red-100", text: "text-red-800" }
    if (item.isLowStock) return { label: "Sắp hết", bg: "bg-red-50", text: "text-red-700" }
    if (item.isExpiringSoon) return { label: "Cận date", bg: "bg-amber-50", text: "text-amber-700" }
    return { label: "Còn hàng", bg: "bg-green-50", text: "text-green-700" }
  }
  const status = getStatusInfo()

  return (
    <div className="bg-white p-4 border border-slate-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{item.productName}</p>
          <p className="text-xs text-slate-500">{item.skuCode}</p>
        </div>
        <Badge className={`${status.bg} ${status.text} text-xs`}>{status.label}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-slate-500">Tồn kho</p>
          <p className="text-base font-semibold text-slate-900">{item.quantity} {item.unitName}</p>
        </div>
        <div>
          <p className="text-slate-500">Vị trí</p>
          <p className="text-sm font-medium text-slate-900">{item.warehouseCode}-{item.shelfCode}</p>
        </div>
        {item.expiryDate && (
          <div>
            <p className="text-slate-500">Hạn SD</p>
            <p className="text-sm text-slate-900">{new Date(item.expiryDate).toLocaleDateString('vi-VN')}</p>
          </div>
        )}
        <div>
          <p className="text-slate-500">Giá trị</p>
          <p className="text-sm font-medium text-slate-900">{formatCurrency(item.totalValue)}</p>
        </div>
      </div>
    </div>
  )
}

// Desktop Inventory Table
function InventoryTableDesktop({ items }: { items: InventoryItem[] }) {
  return (
    <div className="hidden md:block bg-white border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Mã SP</th>
              <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Tên sản phẩm</th>
              <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Vị trí</th>
              <th className="text-right text-xs font-medium text-slate-600 px-4 py-3">Tồn kho</th>
              <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Hạn SD</th>
              <th className="text-left text-xs font-medium text-slate-600 px-4 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const getStatusInfo = () => {
                if (item.quantity === 0) return { label: "Hết hàng", bg: "bg-red-100", text: "text-red-800" }
                if (item.isLowStock) return { label: "Sắp hết", bg: "bg-red-50", text: "text-red-700" }
                if (item.isExpiringSoon) return { label: "Cận date", bg: "bg-amber-50", text: "text-amber-700" }
                return { label: "Còn hàng", bg: "bg-green-50", text: "text-green-700" }
              }
              const status = getStatusInfo()

              return (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-sm font-mono text-slate-600">{item.skuCode}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.productName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <Badge variant="outline" className="text-xs">{item.warehouseCode}-{item.shelfCode}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-right text-slate-900">
                    {item.quantity} {item.unitName}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('vi-VN') : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`${status.bg} ${status.text} text-xs`}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "in-stock", label: "Còn hàng" },
  { value: "low-stock", label: "Sắp hết" },
  { value: "out-of-stock", label: "Hết hàng" },
]

export function StockPage() {
  const { setTitle } = usePageTitle()
  const [filters, setFilters] = useState<InventoryFilters>({ search: "", status: "all" })
  const [filteredItems, setFilteredItems] = useState(mockInventory)

  useEffect(() => { setTitle("Tồn kho") }, [setTitle])

  useEffect(() => {
    let items = [...mockInventory]
    if (filters.search) {
      const search = filters.search.toLowerCase()
      items = items.filter(i =>
        i.productName.toLowerCase().includes(search) || i.skuCode.toLowerCase().includes(search)
      )
    }
    if (filters.status === "low-stock") items = items.filter(i => i.isLowStock)
    else if (filters.status === "out-of-stock") items = items.filter(i => i.quantity === 0)
    else if (filters.status === "in-stock") items = items.filter(i => !i.isLowStock && i.quantity > 0)
    setFilteredItems(items)
  }, [filters])

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>
          Tồn kho
        </h1>
        <p className="text-sm text-slate-500 mt-1">Theo dõi số lượng, vị trí và hạn sử dụng của hàng hóa</p>
      </div>

      {/* KPI Cards - 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Tổng số SKU"
          value={String(mockInventoryKPIs.totalSKUs)}
          icon={<Package className="h-5 w-5 text-slate-700" />}
          color="bg-slate-100"
        />
        <KPICard
          title="Giá trị tồn kho"
          value={formatCurrency(mockInventoryKPIs.totalValue)}
          icon={<TrendingUp className="h-5 w-5 text-green-700" />}
          color="bg-green-50"
        />
        <KPICard
          title="Sắp hết hàng"
          value={String(mockInventoryKPIs.lowStockCount)}
          icon={<AlertTriangle className="h-5 w-5 text-red-700" />}
          color="bg-red-50"
        />
        <KPICard
          title="Hàng cận date"
          value={String(mockInventoryKPIs.expiringSoonCount)}
          icon={<CalendarClock className="h-5 w-5 text-amber-700" />}
          color="bg-amber-50"
        />
      </div>

      {/* Filters with Dropdown */}
      <div className="bg-white p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Tìm theo tên hoặc mã SP..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="flex-1 h-11"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as InventoryFilters['status'] }))}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[200px]"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <p className="text-xs text-slate-500">{filteredItems.length} sản phẩm</p>
      </div>

      {/* Inventory List */}
      <div className="block md:hidden space-y-3">
        {filteredItems.map(item => <InventoryCardMobile key={item.id} item={item} />)}
      </div>
      <InventoryTableDesktop items={filteredItems} />

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  )
}
