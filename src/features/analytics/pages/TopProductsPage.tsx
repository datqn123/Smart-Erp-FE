import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function TopProductsPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Sản Phẩm Bán Chạy")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Sản phẩm bán chạy
        </h1>
        <p className="text-slate-500 mt-1">Những sản phẩm bán chạy nhất trong kỳ</p>
      </div>
      <EmptyState 
        title="Chưa có dữ liệu"
        description="Dữ liệu sản phẩm bán chạy sẽ hiển thị sau khi có giao dịch"
        actionLabel="Xem hướng dẫn"
      />
    </div>
  )
}
