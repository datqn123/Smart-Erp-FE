import { useEffect } from "react"
import { EmptyState } from "@/components/shared/EmptyState"
import { usePageTitle } from "@/context/PageTitleContext"

export function EmployeesPage() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle("Quản Lý Nhân Viên")
  }, [setTitle])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Quản lý nhân viên
        </h1>
        <p className="text-slate-500 mt-1">Quản lý danh sách nhân viên và phân quyền</p>
      </div>
      <EmptyState 
        title="Chưa có nhân viên"
        description="Thêm nhân viên mới để quản lý tài khoản"
        actionLabel="Thêm nhân viên"
      />
    </div>
  )
}
