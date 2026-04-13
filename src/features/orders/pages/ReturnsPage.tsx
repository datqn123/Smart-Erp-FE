import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function ReturnsPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Trả hàng")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Trả hàng
        </h1>
        <p className="text-slate-500 mt-1">Xử lý các yêu cầu trả hàng</p>
      </div>
      <EmptyState 
        title="Chưa có đơn trả hàng"
        description="Tạo phiếu trả hàng khi khách hàng muốn trả sản phẩm"
        actionLabel="Tạo phiếu trả"
      />
    </div>
  )
}
