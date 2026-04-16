import { useEffect, useState, useRef, useCallback } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import {
  FileInput, Plus, Search, Calendar, Upload, Download, Camera,
  ChevronDown, ChevronUp, Building2, User, Hash, Package
} from "lucide-react"
import { formatCurrency, formatDate } from "../utils"
import { mockStockReceipts } from "../mockData"
import type { StockReceipt } from "../types"
import { StatusBadge } from "../components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { filterReceipts, paginateReceipts, sortByDate } from "../inboundLogic"

// ─── Receipt Card ─────────────────────────────────────────
function ReceiptCard({ receipt }: { receipt: StockReceipt }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`bg-white border rounded-lg overflow-hidden transition-shadow ${expanded ? "border-slate-300 shadow-md" : "border-slate-200 shadow-sm"}`}>
      {/* Collapsed header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-slate-50/50 transition-colors"
        aria-expanded={expanded}
      >
        {/* Row 1: Receipt code + Status badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm font-semibold text-slate-900 tracking-tight">
            {receipt.receiptCode}
          </span>
          <div className="flex items-center gap-2">
            <StatusBadge status={receipt.status} />
            {expanded
              ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
              : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
            }
          </div>
        </div>

        {/* Row 2: NCC + Date + Total + Item count */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            {receipt.supplierName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formatDate(receipt.receiptDate)}
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(receipt.totalAmount)}</span>
          {receipt.details.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Package className="h-3 w-3" />
              {receipt.details.length} dòng SP
            </span>
          )}
        </div>

        {/* Row 3: Creator + Invoice number */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mt-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {receipt.staffName}
          </span>
          {receipt.invoiceNumber && (
            <span className="flex items-center gap-1">
              <Hash className="h-3 w-3" />
              {receipt.invoiceNumber}
            </span>
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 border-t border-slate-100 space-y-4">
          {/* Workflow steps */}
          <div className="flex items-center gap-2">
            {(["Draft", "Pending", "Approved"] as const).map((step, i, arr) => {
              const statusOrder = ["Draft", "Pending", "Approved", "Rejected"]
              const currentIdx = statusOrder.indexOf(receipt.status)
              const stepIdx = statusOrder.indexOf(step)
              const isCompleted = receipt.status === "Approved" && stepIdx <= 2
              const isCurrent = step === receipt.status
              const isPast = stepIdx < currentIdx && receipt.status !== "Approved"
              return (
                <div key={step} className="flex items-center">
                  <div className={`px-2.5 py-1 rounded text-xs font-medium
                    ${isCompleted || isPast ? "bg-green-50 text-green-700" : ""}
                    ${isCurrent && receipt.status !== "Approved" && receipt.status !== "Rejected" ? "bg-blue-50 text-blue-700" : ""}
                    ${isCurrent && receipt.status === "Rejected" ? "bg-red-50 text-red-700" : ""}
                    ${!isCompleted && !isCurrent && !isPast ? "bg-slate-50 text-slate-400" : ""}
                  `}>
                    {isCompleted || isPast ? "✓" : isCurrent ? "●" : "○"}{" "}
                    {step === "Draft" ? "Nháp" : step === "Pending" ? "Chờ duyệt" : "Đã duyệt"}
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-5 h-0.5 mx-1 ${isCompleted ? "bg-green-300" : "bg-slate-200"}`} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><p className="text-xs text-slate-500 mb-0.5">Nhà cung cấp</p><p className="font-medium text-slate-900">{receipt.supplierName}</p></div>
            <div><p className="text-xs text-slate-500 mb-0.5">Ngày nhập</p><p className="font-medium text-slate-900">{formatDate(receipt.receiptDate)}</p></div>
            <div><p className="text-xs text-slate-500 mb-0.5">Người tạo</p><p className="font-medium text-slate-900">{receipt.staffName}</p></div>
            <div><p className="text-xs text-slate-500 mb-0.5">Tổng tiền</p><p className="font-semibold text-slate-900">{formatCurrency(receipt.totalAmount)}</p></div>
          </div>

          {receipt.notes && (
            <div><p className="text-xs text-slate-500 mb-0.5">Ghi chú</p><p className="text-sm text-slate-700">{receipt.notes}</p></div>
          )}

          {receipt.details.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Chi tiết hàng ({receipt.details.length} dòng)</p>
              <div className="border border-slate-200 rounded divide-y divide-slate-100">
                {receipt.details.map((d) => (
                  <div key={d.id} className="flex justify-between items-center px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{d.productName}</p>
                      <p className="text-xs text-slate-500">{d.skuCode} · {d.unitName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{d.quantity} × {formatCurrency(d.costPrice)}</p>
                      <p className="text-xs text-slate-500">{formatCurrency(d.lineTotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {receipt.approvedByName && (
            <div className="bg-green-50 border border-green-100 rounded px-3 py-2 text-xs">
              <p className="font-medium text-green-800">Người duyệt: {receipt.approvedByName}</p>
              {receipt.approvedAt && <p className="text-green-600 mt-0.5">{formatDate(receipt.approvedAt)}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Skeleton Loader ──────────────────────────────────────
function ReceiptSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="h-4 bg-slate-200 rounded w-32" />
        <div className="h-6 bg-slate-200 rounded w-20" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 bg-slate-100 rounded w-36" />
        <div className="h-3 bg-slate-100 rounded w-24" />
        <div className="h-3 bg-slate-100 rounded w-20" />
      </div>
    </div>
  )
}

// ─── Filters ──────────────────────────────────────────────
const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Draft", label: "Nháp" },
  { value: "Pending", label: "Chờ duyệt" },
  { value: "Approved", label: "Đã duyệt" },
  { value: "Rejected", label: "Từ chối" },
]

const PAGE_SIZE = 10

// ─── Main Page ────────────────────────────────────────────
export function InboundPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [supplierFilter, setSupplierFilter] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => { setTitle("Phiếu nhập kho") }, [setTitle])

  // Sort + filter
  const sorted = sortByDate(mockStockReceipts)
  const filtered = filterReceipts(sorted, { search, status: statusFilter, dateFrom, dateTo, supplier: supplierFilter })
  const visible = paginateReceipts(filtered, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, statusFilter, dateFrom, dateTo, supplierFilter])

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return
    setIsLoadingMore(true)
    // Simulate tiny async delay for skeleton to show
    setTimeout(() => {
      setVisibleCount(prev => prev + PAGE_SIZE)
      setIsLoadingMore(false)
    }, 300)
  }, [hasMore, isLoadingMore])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { threshold: 0.1 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  const handleCreateReceipt = () => alert("Form tạo phiếu nhập kho sẽ được triển khai")
  const handleScanOCR = () => alert("Chức năng Quét hóa đơn (OCR) sẽ được triển khai khi có API Backend")
  const handleExportExcel = () => alert("Chức năng Export Excel sẽ được triển khai khi có API")
  const handleImportExcel = () => fileInputRef.current?.click()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) alert(`Đã chọn file: ${file.name}. Chức năng Import Excel sẽ được triển khai.`)
  }

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 gap-4 md:gap-5">
      {/* ── Header (sticky, outside scroll) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Phiếu nhập kho</h1>
          <p className="text-sm text-slate-500 mt-1">Theo dõi lịch sử nhập hàng từ nhà cung cấp</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCreateReceipt} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Tạo phiếu nhập
          </Button>
          <Button onClick={handleScanOCR} variant="outline" className="h-11">
            <Camera className="h-4 w-4 mr-2" /> Quét hóa đơn
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

      {/* ── Filters (sticky, outside scroll) ── */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Tìm theo mã phiếu, NCC, người tạo..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-9 h-11" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]">
            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 whitespace-nowrap">Từ ngày:</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="h-9 px-2 border border-slate-200 rounded text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap">Đến ngày:</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="h-9 px-2 border border-slate-200 rounded text-sm" />
          </div>
          <Input placeholder="Lọc theo nhà cung cấp..." value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)} className="h-9 sm:w-[220px]" />
        </div>
        <p className="text-xs text-slate-500">
          Hiển thị <span className="font-medium text-slate-700">{visible.length}</span> / <span className="font-medium text-slate-700">{filtered.length}</span> phiếu
        </p>
      </div>

      {/* ── Scroll Container (independent scroll) ── */}
      <div
        data-testid="receipt-list-container"
        className="flex-1 overflow-y-auto min-h-0 rounded-lg space-y-2.5 pr-1"
      >
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg">
            <FileInput className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm mb-4">Không tìm thấy phiếu nhập kho phù hợp</p>
            <Button onClick={handleCreateReceipt} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
              <Plus className="h-4 w-4 mr-2" /> Tạo phiếu nhập
            </Button>
          </div>
        ) : (
          <>
            {visible.map(r => <ReceiptCard key={r.id} receipt={r} />)}

            {/* Skeleton khi đang tải thêm */}
            {isLoadingMore && (
              <>
                <ReceiptSkeleton />
                <ReceiptSkeleton />
              </>
            )}

            {/* Sentinel element cho IntersectionObserver */}
            {hasMore && !isLoadingMore && (
              <div ref={sentinelRef} className="h-4" />
            )}

            {/* End of list message */}
            {!hasMore && filtered.length > 0 && (
              <p className="text-center text-xs text-slate-400 py-4">
                Đã hiển thị toàn bộ {filtered.length} phiếu
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
