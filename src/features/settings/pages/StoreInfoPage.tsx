import { useEffect, useState } from "react"
import { usePageTitle } from "@/context/PageTitleContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Upload, Store, Globe, MapPin, Phone, Mail, FileText } from "lucide-react"
import { toast } from "sonner"

export function StoreInfoPage() {
  const { setTitle } = usePageTitle()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setTitle("Thông Tin Cửa Hàng")
  }, [setTitle])

  const handleSave = () => {
    toast.success("Đã cập nhật thông tin cửa hàng thành công")
    setIsEditing(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-8 h-full overflow-y-auto bg-slate-50/30">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Thông tin cửa hàng</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý nhận diện thương hiệu và thông tin liên hệ của bạn</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-slate-900 text-white hover:bg-slate-800">
            Thay đổi thông tin
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Hủy</Button>
            <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" /> Lưu thay đổi
            </Button>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Brand & Logo */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Logo cửa hàng</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="h-40 w-40 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=200&h=200&auto=format&fit=crop" alt="Logo" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-8 w-8 text-white" />
                 </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Kích thước gợi ý: 512x512px.<br/>Định dạng: PNG, JPG (Max 2MB)
              </p>
              {isEditing && (
                 <Button variant="outline" size="sm" className="w-full text-xs h-9">Thay đổi ảnh</Button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Mạng xã hội</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">F</div>
                   <span className="text-sm text-slate-600 truncate">fb.com/minierp_store</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-xs">I</div>
                   <span className="text-sm text-slate-600 truncate">@minierp.official</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Detailed Info Form */}
        <div className="lg:col-span-2 space-y-6 text-slate-700">
           {/* Section 1: Basic Info */}
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                 <Store className="h-5 w-5 text-blue-600" />
                 <h3 className="text-lg font-bold text-slate-900">Cấu hình cơ bản</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Tên cửa hàng (Hiển thị hóa đơn)</Label>
                    <Input disabled={!isEditing} defaultValue="Mini ERP Solution Center" className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Lĩnh vực hoạt động</Label>
                    <Input disabled={!isEditing} defaultValue="Bán lẻ & Phân phối thiết bị" className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Địa chỉ kinh doanh</Label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                       <Input disabled={!isEditing} defaultValue="123 Đường ABC, Quận X, TP. Hồ Chí Minh" className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Contact Info */}
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                 <Phone className="h-5 w-5 text-blue-600" />
                 <h3 className="text-lg font-bold text-slate-900">Thông tin liên hệ</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Số điện thoại</Label>
                    <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                       <Input disabled={!isEditing} defaultValue="028 1234 5678" className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Email hỗ trợ</Label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                       <Input disabled={!isEditing} defaultValue="contact@minierp.vn" className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Website</Label>
                    <div className="relative">
                       <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                       <Input disabled={!isEditing} defaultValue="https://minierp.vn" className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Mã số thuế</Label>
                    <div className="relative">
                       <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                       <Input disabled={!isEditing} defaultValue="0312345678" className="pl-10 h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 3: Legal & More */}
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <Label className="text-xs font-bold uppercase tracking-tight text-slate-400">Ghi chú (Hiển thị cuối hóa đơn)</Label>
              <Textarea 
                disabled={!isEditing} 
                className="bg-slate-50/50 border-slate-200 min-h-[120px] focus:bg-white transition-all"
                defaultValue="Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chùng tôi. Hóa đơn có giá trị trong vòng 30 ngày kể từ ngày xuất."
              />
           </div>
        </div>
      </div>
    </div>
  )
}
