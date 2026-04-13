import { useEffect, useState, useRef } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { FileInput, Plus, Eye, Edit2, Search, Calendar, Upload, Download, Camera } from "lucide-react"
import { formatCurrency, formatDate } from "../utils"
import { mockStockReceipts } from "../mockData"
import type { StockReceipt, ReceiptStatus } from "../types"
import { StatusBadge } from "../components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Workflow Steps Component
function WorkflowSteps({ status }: { status: ReceiptStatus }) {
  const steps = [
    { key: "Draft", label: "Nháp" },
    { key: "Pending", label: "Chờ duyệt" },
    { key: "Approved", label: "Đã duyệt" },
  ]
  const statusOrder: ReceiptStatus[] = ["Draft", "Pending", "Approved", "Rejected"]
  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="flex items-center gap-2 py-3">
      {steps.map((step, index) => {
        const isCompleted = status === "Approved" && index <= 2
        const isRejected = status === "Rejected" && step.key === "Pending"
        const isCurrent = step.key === status
        const isPending = index > currentIndex
        return (
          <div key={step.key} className="flex items-center">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium
              ${isCompleted ? "bg-green-50 text-green-700" : ""}
              ${isCurrent ? "bg-blue-50 text-blue-700" : ""}
              ${isRejected ? "bg-red-50 text-red-700" : ""}
              ${isPending ? "bg-slate-50 text-slate-400" : ""}
            `}>
              {isCompleted ? "✓" : isCurrent ? "●" : isRejected ? "✕" : "○"} {step.label}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-6 h-0.5 mx-1 ${isCompleted ? "bg-green-300" : "bg-slate-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Receipt Detail (inline expandable)
function ReceiptDetail({ receipt }: { receipt: StockReceipt }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white border border-slate-200">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50">
        <div className="flex items-center gap-3">
          <Eye className={`h-4 w-4 text-slate-600 transition-transform ${expanded ? "rotate-90" : ""}`} />
          <div className="text-left">
            <p className="font-mono text-sm font-medium">{receipt.receiptCode}</p>
            <p className="text-xs text-slate-500">{receipt.supplierName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{formatCurrency(receipt.totalAmount)}</span>
          <StatusBadge status={receipt.status} />
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          <WorkflowSteps status={receipt.status} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-xs text-slate-500">Nhà cung cấp</p><p className="font-medium">{receipt.supplierName}</p></div>
            <div><p className="text-xs text-slate-500">Ngày nhập</p><p className="font-medium">{formatDate(receipt.receiptDate)}</p></div>
            <div><p className="text-xs text-slate-500">Người tạo</p><p className="font-medium">{receipt.staffName}</p></div>
            <div><p className="text-xs text-slate-500">Tổng tiền</p><p className="font-semibold text-base">{formatCurrency(receipt.totalAmount)}</p></div>
          </div>
          {receipt.notes && <div><p className="text-xs text-slate-500">Ghi chú</p><p className="mt-1 text-sm">{receipt.notes}</p></div>}
          {receipt.details.length > 0 && (
            <div>
              <p className="font-medium text-sm mb-2">Chi tiết ({receipt.details.length} dòng)</p>
              <div className="border border-slate-200 divide-y divide-slate-100">
                {receipt.details.map((detail) => (
                  <div key={detail.id} className="flex justify-between items-center px-3 py-2">
                    <div><p className="text-sm font-medium">{detail.productName}</p><p className="text-xs text-slate-500">{detail.skuCode} • {detail.unitName}</p></div>
                    <div className="text-right"><p className="text-sm font-medium">{detail.quantity} × {formatCurrency(detail.costPrice)}</p><p className="text-xs text-slate-500">{formatCurrency(detail.lineTotal)}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {receipt.approvedByName && (
            <div className="bg-green-50 p-3 text-xs">
              <p className="font-medium text-green-800">Người duyệt: {receipt.approvedByName}</p>
              <p className="text-green-600">{formatDate(receipt.approvedAt)}</p>
            </div>
          )}
          {receipt.status === "Draft" && (
            <Button variant="outline" size="sm" className="h-9"><Edit2 className="h-3.5 w-3.5 mr-1.5" /> Sửa</Button>
          )}
        </div>
      )}
    </div>
  )
}

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Draft", label: "Nháp" },
  { value: "Pending", label: "Chờ duyệt" },
  { value: "Approved", label: "Đã duyệt" },
  { value: "Rejected", label: "Từ chối" },
]

export function InboundPage() {
  const { setTitle } = usePageTitle()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [receipts] = useState(mockStockReceipts)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [supplierFilter, setSupplierFilter] = useState("")

  useEffect(() => { setTitle("Phiếu nhập kho") }, [setTitle])

  const handleExportExcel = () => {
    // TODO: Implement actual Excel export
    alert("Chức năng Export Excel sẽ được triển khai khi có API")
  }

  const handleImportExcel = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Implement actual Excel import
      alert(`Đã chọn file: ${file.name}. Chức năng Import Excel sẽ được triển khai khi có API`)
    }
  }

  const handleScanOCR = () => {
    // TODO: Implement OCR image scan
    alert("Chức năng Quét hóa đơn (OCR) sẽ được triển khai khi có API Backend")
  }

  const handleCreateReceipt = () => {
    // TODO: Navigate to create receipt form
    alert("Form tạo phiếu nhập kho sẽ được triển khai")
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-slate-900" style={{ letterSpacing: "-0.02em" }}>
            Phiếu nhập kho
          </h1>
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

      {/* Filters */}
      <div className="bg-white p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm theo mã phiếu, NCC, người tạo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full sm:w-[180px]"
          >
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
          <Input placeholder="Lọc theo nhà cung cấp..." value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)} className="h-9 sm:w-[200px]" />
        </div>
        <p className="text-xs text-slate-500">{receipts.length} phiếu nhập kho</p>
      </div>

      {/* Receipt List */}
      <div className="space-y-3">
        {receipts.map(r => <ReceiptDetail key={r.id} receipt={r} />)}
      </div>

      {receipts.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200">
          <FileInput className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Chưa có phiếu nhập kho</p>
          <Button onClick={handleCreateReceipt} className="h-11 bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4 mr-2" /> Tạo phiếu nhập
          </Button>
        </div>
      )}
    </div>
  )
}
