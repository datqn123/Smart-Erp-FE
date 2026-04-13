import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải ít nhất 6 ký tự" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    console.log("Login data:", data)
    // Simulate API call for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate("/dashboard")
  }

  return (
    <Card className="w-full max-w-md bg-white border-none shadow-[0px_10px_30px_rgba(43,52,55,0.06)] rounded-lg lg:rounded-xl">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl font-medium text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Chào mừng trở lại
        </CardTitle>
        <CardDescription className="text-muted-foreground font-normal leading-relaxed">
          Hãy nhập thông tin để quản lý doanh nghiệp của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ten@vi-du.com"
              {...register("email")}
              className={`h-11 bg-muted border-none transition-all duration-200 ease-in-out
                focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_rgba(100,116,139,0.2)]
                ${errors.email ? "bg-alert-light text-alert" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-alert mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Mật khẩu
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`h-11 bg-muted border-none pr-12 transition-all duration-200 ease-in-out
                  focus-visible:ring-0 focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_rgba(100,116,139,0.2)]
                  ${errors.password ? "bg-alert-light text-alert" : ""}`}
              />
              {/* Show/Hide password toggle - 44px touch target */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>

            {/* Error Message and Forgot Password aligned below input */}
            <div className="flex items-center justify-between mt-2 min-h-[44px]">
              <div className="flex-1">
                {errors.password && (
                  <p className="text-xs text-alert">{errors.password.message}</p>
                )}
              </div>
              {/* [B] Forgot Password - Subdued, Right Aligned */}
              <button 
                type="button" 
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out py-2 pl-2"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          {/* [A] Login Button - 44px height, gradient per Login.md spec */}
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-br from-primary to-primary-hover text-white font-medium rounded-[0.5rem] transition-all duration-200 ease-in-out mt-4 hover:opacity-95 active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
