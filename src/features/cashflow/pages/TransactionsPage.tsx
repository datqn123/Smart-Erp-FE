import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function TransactionsPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Thu chi")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Thu chi
        </h1>
        <p className="text-slate-500 mt-1">Ghi nhận các giao dịch thu chi</p>
      </div>
      <EmptyState 
        title="Chưa có giao dịch nào"
        description="Ghi nhận các khoản thu chi của cửa hàng"
        actionLabel="Thêm giao dịch"
      />
    </div>
  )
}
