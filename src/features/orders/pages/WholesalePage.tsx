import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function WholesalePage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Bán sỉ")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Bán sỉ
        </h1>
        <p className="text-slate-500 mt-1">Quản lý đơn hàng bán sỉ</p>
      </div>
      <EmptyState 
        title="Chưa có đơn bán sỉ"
        description="Tạo đơn bán sỉ mới cho khách hàng"
        actionLabel="Tạo đơn hàng"
      />
    </div>
  )
}
