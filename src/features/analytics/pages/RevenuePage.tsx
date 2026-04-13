import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function RevenuePage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Doanh Thu & Lợi Nhuận")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Doanh thu & Lợi nhuận
        </h1>
        <p className="text-slate-500 mt-1">Phân tích doanh thu và lợi nhuận kinh doanh</p>
      </div>
      <EmptyState 
        title="Chưa có dữ liệu"
        description="Sau khi có các giao dịch, biểu đồ sẽ hiển thị ở đây"
        actionLabel="Xem hướng dẫn"
      />
    </div>
  )
}
