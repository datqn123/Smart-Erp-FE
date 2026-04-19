import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { mockDebts } from "../mockData"
import type { Debt } from "../types"
import { DebtToolbar } from "../components/DebtToolbar"
import { DebtTable } from "../components/DebtTable"
import { toast } from "sonner"

export function DebtPage() {
  const { setTitle } = usePageTitle()
  
  const [debts] = useState<Debt[]>(mockDebts)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  useEffect(() => { setTitle("Sổ nợ") }, [setTitle])

  const filtered = debts.filter(d => {
    if (statusFilter !== "all" && d.status !== statusFilter) return false
    if (typeFilter !== "all" && d.partnerType !== typeFilter) return false
    if (search && !d.debtCode.toLowerCase().includes(search.toLowerCase()) && !d.partnerName.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Handlers
  const handleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map(d => d.id) : [])
  }

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "repay":
        toast.info(`Mở form thanh toán cho ${selectedIds.length} khoản nợ`)
        break;
      case "delete":
        toast.success(`Đã xoá ${selectedIds.length} khoản nợ`)
        setSelectedIds([])
        break;
      case "create":
        toast.info("Mở form tạo khoản nợ mới")
        break;
      case "export":
        toast.info("Đang xuất dữ liệu Excel...")
        break;
    }
  }

  const handleView = (item: Debt) => {
    toast.info(`Xem chi tiết nợ: ${item.debtCode}`)
  }

  const handleEdit = (item: Debt) => {
    toast.info(`Cập nhật thanh toán cho nợ: ${item.debtCode}`)
  }

  const handleDelete = (item: Debt) => {
    toast.error(`Yêu cầu xóa khoản nợ: ${item.debtCode}`)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Sổ nợ</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý công nợ khách hàng và nhà cung cấp</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-transparent rounded-lg">
        {/* Toolbar */}
        <DebtToolbar 
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
        <DebtTable 
          data={filtered}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
