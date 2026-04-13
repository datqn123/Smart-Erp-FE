import { LoginForm } from "../components/LoginForm"

export function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] p-4 sm:p-6 antialiased">
      <div className="w-full flex flex-col items-center max-w-lg">
        {/* Logo / Brand Header */}
        <div className="mb-10 flex flex-col items-center space-y-3">
          <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Mini ERP
            </h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1">
              Smart Management
            </p>
          </div>
        </div>
        
        {/* Login Form Component */}
        <LoginForm />
        
        {/* [C] Notify Owner link - Calm Alert Pill per Login.md spec */}
        <footer className="mt-12 text-center w-full flex justify-center">
          <button 
            type="button"
            className="flex items-center justify-center bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] transition-colors duration-200 rounded-full px-6 h-11 text-sm font-medium"
          >
            Chưa có tài khoản? Gửi yêu cầu cho Chủ cửa hàng
          </button>
        </footer>
      </div>
    </main>
  )
}
