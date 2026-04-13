import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { ClipboardCheck, Plus, Eye, AlertTriangle, CheckCircle, TrendingUp, Minus, Search, Calendar, Download, Upload } from "lucide-react"
import { formatDate } from "../utils"
import { mockAuditSessions } from "../mockData"
import type { AuditSession } from "../types"
import { StatusBadge } from "../components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Variance Badge
function VarianceBadge({ variance, variancePercent }: { variance: number; variancePercent: number }) {
  if (variance === 0) return <Badge className="bg-green-50 text-green-700 text-xs">✓ Khớp</Badge>
  if (variance > 0) return (
    <Badge className="bg-blue-50 text-blue-700 text-xs"><TrendingUp className="h-3 w-3 mr-1" /> +{variance} ({variancePercent.toFixed(1)}%)</Badge>
  )
  return (
    <Badge className="bg-red-50 text-red-700 text-xs"><Minus className="h-3 w-3 mr-1" /> {variance} ({variancePercent.toFixed(1)}%)</Badge>
  )
}

// Audit Detail (inline expandable)
function AuditDetail({ session }: { session: AuditSession }) {
  const [expanded, setExpanded] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [actualQty, setActualQty] = useState("")
  const countedCount = session.items.filter(i => i.isCounted).length
  const varianceCount = session.items.filter(i => i.isCounted && i.variance !== 0).length

  return (
    <div className="bg-white border border-slate-200">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50">
        <div className="flex items-center gap-3">
          <Eye className={`h-4 w-4 text-slate-600 transition-transform ${expanded ? "rotate-90" : ""}`} />
          <div className="text-left">
            <p className="font-mono text-sm font-medium">{session.auditCode}</p>
            <p className="text-xs text-slate-500 truncate max-w-[200px]">{session.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{countedCount}/{session.items.length}</span>
          <StatusBadge status={session.status} type="audit" />
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 text-center"><p className="text-xs text-slate-500">Tổng hàng</p><p className="text-lg font-semibold">{session.items.length}</p></div>
            <div className="bg-green-50 p-3 text-center"><p className="text-xs text-green-600">Đã kiểm</p><p className="text-lg font-semibold text-green-700">{countedCount}</p></div>
            <div className="bg-slate-50 p-3 text-center"><p className="text-xs text-slate-500">Chưa kiểm</p><p className="text-lg font-semibold">{session.items.length - countedCount}</p></div>
            <div className="bg-amber-50 p-3 text-center"><p className="text-xs text-amber-600">Chênh lệch</p><p className="text-lg font-semibold text-amber-700">{varianceCount}</p></div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1"><span>Tiến độ</span><span>{session.items.length > 0 ? Math.round((countedCount / session.items.length) * 100) : 0}%</span></div>
            <div className="w-full bg-slate-200 h-2">
              <div className="bg-green-500 h-2 transition-all" style={{ width: `${session.items.length > 0 ? (countedCount / session.items.length) * 100 : 0}%` }} />
            </div>
          </div>
          {session.items.length > 0 && (
            <div className="space-y-2">
              {session.items.map((item) => (
                <div key={item.id} className="border border-slate-200 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-slate-500">{item.skuCode} • {item.warehouseCode}-{item.shelfCode}</p>
                    </div>
                    <VarianceBadge variance={item.variance} variancePercent={item.variancePercent} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div><p className="text-slate-500">Tồn HT</p><p className="font-semibold">{item.systemQuantity}</p></div>
                    <div>
                      <p className="text-slate-500">Thực tế</p>
                      {editingItem === item.id ? (
                        <Input type="number" min="0" value={actualQty} onChange={(e) => setActualQty(e.target.value)}
                          className="h-7 text-sm w-20" autoFocus onBlur={() => setEditingItem(null)} />
                      ) : (
                        <button onClick={() => { setEditingItem(item.id); setActualQty(String(item.actualQuantity ?? '')) }}
                          className="font-semibold hover:text-blue-600">
                          {item.isCounted ? item.actualQuantity : 'Nhập'}
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="text-slate-500">Trạng thái</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {item.isCounted ? (
                          <><CheckCircle className="h-3.5 w-3.5 text-green-600" /> <span className="text-green-700">Đã kiểm</span></>
                        ) : (
                          <><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> <span className="text-amber-600">Chưa kiểm</span></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-slate-500 space-y-1">
            <p>Người tạo: {session.createdByName} • Ngày kiểm: {formatDate(session.auditDate)}</p>
            {session.completedByName && <p>Hoàn thành bởi: {session.completedByName} • {formatDate(session.completedAt)}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Pending", label: "Chờ kiểm" },
  { value: "In Progress", label: "Đang kiểm" },
  { value: "Completed", label: "Hoàn thành" },
  { value: "Cancelled", label: "Đã hủy" },
]

export function AuditPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sessions] = useState(mockAuditSessions)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  useEffect(() => { setTitle("Kiểm kê kho") }, [setTitle])

  const handleExportExcel = () => { alert("Chức năng Export Excel sẽ được triển khai khi có API") }
  const handleImportExcel = () => { fileInputRef.current?.click() }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn file: ${file.name}. Import Excel sẽ được triển khai khi có API`)
  }
  const handleCreateAudit = () => { alert("Form tạo đợt kiểm kê sẽ được triển khai") }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>
            Kiểm kê kho
          </h1>
          <p className="text-sm text-slate-500 mt-1">Đối chiếu tồn kho hệ thống với thực tế</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreateAudit} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Tạo đợt kiểm kê
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
            <Input placeholder="Tìm theo mã, tên đợt kiểm kê..." value={search}
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
        <p className="text-xs text-slate-500">{sessions.length} đợt kiểm kê</p>
      </div>

      {/* Audit List */}
      <div className="space-y-3">
        {sessions.map(s => <AuditDetail key={s.id} session={s} />)}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <ClipboardCheck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Chưa có đợt kiểm kê nào</p>
          <Button onClick={handleCreateAudit} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Tạo đợt kiểm kê
          </Button>
        </div>
      )}
    </div>
  )
}
