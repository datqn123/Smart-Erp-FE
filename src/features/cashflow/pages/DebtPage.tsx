import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function DebtPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Sổ nợ")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Sổ nợ
        </h1>
        <p className="text-slate-500 mt-1">Quản lý các khoản nợ phải trả/phải thu</p>
      </div>
      <EmptyState 
        title="Chưa có khoản nợ nào"
        description="Các khoản nợ sẽ xuất hiện ở đây"
        actionLabel="Thêm khoản nợ"
      />
    </div>
  )
}
