import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function RetailPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Bán lẻ (POS)")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Bán lẻ (POS)
        </h1>
        <p className="text-slate-500 mt-1">Xử lý các giao dịch bán lẻ tại quầy</p>
      </div>
      <EmptyState 
        title="Chưa có đơn bán nào"
        description="Tạo đơn bán lẻ đầu tiên của bạn"
        actionLabel="Tạo đơn bán"
      />
    </div>
  )
}
