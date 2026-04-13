import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { DashboardPage } from "./features/dashboard/pages/DashboardPage"
import { MainLayout } from "./components/shared/layout/MainLayout"

// Inventory
import { InboundPage } from "./features/inventory/pages/InboundPage"
import { AuditPage } from "./features/inventory/pages/AuditPage"
import { StockPage } from "./features/inventory/pages/StockPage"
import { DispatchPage } from "./features/inventory/pages/DispatchPage"

// Product Management
import { CategoriesPage } from "./features/product-management/pages/CategoriesPage"
import { ProductsPage } from "./features/product-management/pages/ProductsPage"
import { SuppliersPage } from "./features/product-management/pages/SuppliersPage"
import { CustomersPage } from "./features/product-management/pages/CustomersPage"

// Orders
import { RetailPage } from "./features/orders/pages/RetailPage"
import { WholesalePage } from "./features/orders/pages/WholesalePage"
import { ReturnsPage } from "./features/orders/pages/ReturnsPage"

// Cashflow
import { TransactionsPage } from "./features/cashflow/pages/TransactionsPage"
import { DebtPage } from "./features/cashflow/pages/DebtPage"

// Analytics
import { RevenuePage } from "./features/analytics/pages/RevenuePage"
import { TopProductsPage } from "./features/analytics/pages/TopProductsPage"

// Settings
import { StoreInfoPage } from "./features/settings/pages/StoreInfoPage"
import { EmployeesPage } from "./features/settings/pages/EmployeesPage"

import { PageTitleProvider } from "./context/PageTitleContext"

// Placeholder pages - TODO: Implement these
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6">
    <h1 className="text-2xl font-medium text-slate-900 mb-4">{title}</h1>
    <p className="text-slate-600">Trang đang được phát triển...</p>
  </div>
)

function App() {
  return (
    <PageTitleProvider>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Auth Routes (No Sidebar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main Layout Routes (With Sidebar) */}
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/ai-insights" element={<PlaceholderPage title="AI Insights" />} />

          {/* Inventory Routes */}
          <Route path="/inventory/stock" element={<StockPage />} />
          <Route path="/inventory/inbound" element={<InboundPage />} />
          <Route path="/inventory/dispatch" element={<DispatchPage />} />
          <Route path="/inventory/audit" element={<AuditPage />} />

          {/* Products Routes */}
          <Route path="/products/categories" element={<CategoriesPage />} />
          <Route path="/products/list" element={<ProductsPage />} />
          <Route path="/products/suppliers" element={<SuppliersPage />} />
          <Route path="/products/customers" element={<CustomersPage />} />

          {/* Orders Routes */}
          <Route path="/orders/retail" element={<RetailPage />} />
          <Route path="/orders/wholesale" element={<WholesalePage />} />
          <Route path="/orders/returns" element={<ReturnsPage />} />

          {/* Approvals Routes */}
          <Route path="/approvals/pending" element={<PlaceholderPage title="Chờ phê duyệt" />} />
          <Route path="/approvals/history" element={<PlaceholderPage title="Lịch sử phê duyệt" />} />

          {/* Cashflow Routes */}
          <Route path="/cashflow/transactions" element={<TransactionsPage />} />
          <Route path="/cashflow/debt" element={<DebtPage />} />
          <Route path="/cashflow/ledger" element={<PlaceholderPage title="Sổ cái tài chính" />} />

          {/* Analytics Routes */}
          <Route path="/analytics/revenue" element={<RevenuePage />} />
          <Route path="/analytics/top-products" element={<TopProductsPage />} />
          <Route path="/analytics/inventory-report" element={<PlaceholderPage title="Báo cáo tồn kho" />} />

          {/* AI Tools Routes */}
          <Route path="/ai/chat" element={<PlaceholderPage title="AI Chat Bot" />} />
          <Route path="/ai/ocr-scanner" element={<PlaceholderPage title="Quét hóa đơn (OCR)" />} />
          <Route path="/ai/voice-input" element={<PlaceholderPage title="Nhập liệu bằng giọng nói" />} />

          {/* Settings Routes */}
          <Route path="/settings/store-info" element={<StoreInfoPage />} />
          <Route path="/settings/employees" element={<EmployeesPage />} />
          <Route path="/settings/alerts" element={<PlaceholderPage title="Cấu hình cảnh báo" />} />
          <Route path="/settings/system-logs" element={<PlaceholderPage title="Nhật ký hệ thống" />} />
        </Route>

        {/* Default and 404 Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">
            404 - Trang không tồn tại
          </div>
        } />
      </Routes>
    </PageTitleProvider>
  )
}

export default App
