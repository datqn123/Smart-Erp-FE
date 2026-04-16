import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockTransactions } from "../mockData"
import type { Transaction } from "../types"
import { TransactionToolbar } from "../components/TransactionToolbar"
import { TransactionTable } from "../components/TransactionTable"
import { toast } from "sonner"

export function TransactionsPage() {
  const { setTitle } = usePageTitle()
  
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => { setTitle("Sổ quỹ") }, [setTitle])

  const filtered = transactions.filter(t => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false
    if (typeFilter !== "all" && t.type !== typeFilter) return false
    if (search && !t.transactionCode.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(t => t.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "edit":
        toast.info(`Chỉnh sửa ${selectedIds.length} giao dịch`)
        break;
      case "delete":
        toast.success(`Đã xoá ${selectedIds.length} giao dịch`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo phiếu thu/chi")
        break;
      case "export":
        toast.info("Đang xuất dữ liệu Excel...")
        break;
    }
  }

  const handleView = (item: Transaction) => {
    toast.info(`Xem chi tiết giao dịch: ${item.transactionCode}`)
  }

  const handleEdit = (item: Transaction) => {
    toast.info(`Chỉnh sửa giao dịch: ${item.transactionCode}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Sổ quỹ</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thu chi và luân chuyển tiền mặt</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <TransactionToolbar 
          searchStr={search}
          onSearch={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          selectedIds={selectedIds}
          onAction={handleToolbarAction}
        />
        
        {/* Data Table */}
        <TransactionTable 
          data={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
