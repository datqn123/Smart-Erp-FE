import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function StoreInfoPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Thông Tin Cửa Hàng")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Thông tin cửa hàng
        </h1>
        <p className="text-slate-500 mt-1">Quản lý thông tin cơ bản về cửa hàng</p>
      </div>
      <EmptyState 
        title="Cập nhật thông tin"
        description="Cấu hình thông tin cửa hàng của bạn"
        actionLabel="Chỉnh sửa"
      />
    </div>
  )
}
