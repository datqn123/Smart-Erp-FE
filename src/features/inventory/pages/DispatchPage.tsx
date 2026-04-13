import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { MapPin, Truck, Eye, Search, Calendar, Download, Upload, Plus } from "lucide-react"
import { formatDate } from "../utils"
import { mockStockDispatchs } from "../mockData"
import type { StockDispatch } from "../types"
import { StatusBadge } from "../components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Picking List Component
function PickingList({ items }: { items: StockDispatch['items'] }) {
  if (items.length === 0) return null
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm flex items-center gap-2">
        <MapPin className="h-4 w-4 text-slate-600" /> Danh sách lấy hàng (Picking List)
      </h3>
      {items.map((item) => (
        <div key={item.id} className="bg-green-50 border-l-4 border-green-500 p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-medium text-sm">{item.productName}</p>
              <p className="text-xs text-slate-500">{item.skuCode}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {item.isFullyDispatched ? "✓ Đủ" : "● Một phần"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div><p className="text-slate-500">Vị trí</p><p className="font-semibold text-base">{item.warehouseLocation}-{item.shelfCode}</p></div>
            <div><p className="text-slate-500">Cần xuất</p><p className="font-semibold text-base text-green-700">{item.remainingQty} {item.unitName}</p></div>
            <div><p className="text-slate-500">Tồn khả dụng</p><p className="font-medium">{item.availableStock} {item.unitName}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Dispatch Detail (inline expandable)
function DispatchDetail({ dispatch }: { dispatch: StockDispatch }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white border border-slate-200">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50">
        <div className="flex items-center gap-3">
          <Eye className={`h-4 w-4 text-slate-600 transition-transform ${expanded ? "rotate-90" : ""}`} />
          <div className="text-left">
            <p className="font-mono text-sm font-medium">{dispatch.dispatchCode}</p>
            <p className="text-xs text-slate-500">{dispatch.orderCode} • {dispatch.customerName}</p>
          </div>
        </div>
        <StatusBadge status={dispatch.status} type="dispatch" />
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-slate-500">Đơn hàng</p><p className="font-medium">{dispatch.orderCode}</p></div>
            <div><p className="text-xs text-slate-500">Khách hàng</p><p className="font-medium">{dispatch.customerName}</p></div>
            <div><p className="text-xs text-slate-500">Ngày xuất</p><p className="font-medium">{formatDate(dispatch.dispatchDate)}</p></div>
            <div><p className="text-xs text-slate-500">Người xuất</p><p className="font-medium">{dispatch.userName}</p></div>
          </div>
          {dispatch.notes && <div><p className="text-xs text-slate-500">Ghi chú</p><p className="mt-1 text-sm">{dispatch.notes}</p></div>}
          <PickingList items={dispatch.items} />
        </div>
      )}
    </div>
  )
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Pending", label: "Chờ xuất" },
  { value: "Full", label: "Đủ hàng" },
  { value: "Partial", label: "Một phần" },
  { value: "Cancelled", label: "Đã hủy" },
]

export function DispatchPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dispatches] = useState(mockStockDispatchs)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  useEffect(() => { setTitle("Xuất kho & Điều phối") }, [setTitle])

  const handleExportExcel = () => { alert("Chức năng Export Excel sẽ được triển khai khi có API") }
  const handleImportExcel = () => { fileInputRef.current?.click() }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn file: ${file.name}. Import Excel sẽ được triển khai khi có API`)
  }
  const handleCreateDispatch = () => { alert("Form tạo phiếu xuất kho sẽ được triển khai") }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>
            Xuất kho & Điều phối
          </h1>
          <p className="text-sm text-slate-500 mt-1">Xử lý xuất hàng theo đơn bán, tạo picking list</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreateDispatch} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Tạo phiếu xuất
          </Button>
          <Button onClick={handleExportExcel} variant="outline" className="h-11">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button onClick={handleImportExcel} variant="outline" className="h-11">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Tìm theo mã phiếu, đơn hàng, khách hàng..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500">Từ ngày:</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="h-9 px-2 border border-slate-200 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Đến ngày:</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="h-9 px-2 border border-slate-200 text-sm" />
          </div>
        </div>
        <p className="text-xs text-slate-500">{dispatches.length} phiếu xuất kho</p>
      </div>

      {/* Dispatch List */}
      <div className="space-y-3">
        {dispatches.map(d => <DispatchDetail key={d.id} dispatch={d} />)}
      </div>

      {dispatches.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <Truck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Chưa có phiếu xuất kho</p>
          <Button onClick={handleCreateDispatch} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Truck className="h-4 w-4 mr-2" /> Tạo phiếu xuất
          </Button>
        </div>
      )}
    </div>
  )
}
