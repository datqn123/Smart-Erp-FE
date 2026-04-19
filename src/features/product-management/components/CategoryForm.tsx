import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, X, FolderTree, Tag, Hash, CheckCircle2, ListTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Category } from "../types"

const categorySchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên danh mục"),
  categoryCode: z.string().min(1, "Vui lòng nhập mã danh mục"),
  parentId: z.number().optional().or(z.literal(0)),
  description: z.string().optional(),
  sortOrder: z.number().default(0),
  status: z.enum(["Active", "Inactive"]),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
  allCategories?: Category[]
  onSubmit: (data: CategoryFormData) => void
}

export function CategoryForm({ open, onOpenChange, category, allCategories = [], onSubmit }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      categoryCode: "",
      parentId: 0,
      description: "",
      sortOrder: 0,
      status: "Active",
    }
  })

  // Reset form when category changes
  React.useEffect(() => {
    if (open) {
      if (category) {
        form.reset({
          name: category.name || "",
          categoryCode: category.categoryCode || `CAT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          parentId: category.parentId || 0,
          description: category.description || "",
          sortOrder: category.sortOrder || 0,
          status: category.status || "Active",
        })
      } else {
        form.reset({
          name: "",
          categoryCode: `CAT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          parentId: 0,
          description: "",
          sortOrder: 0,
          status: "Active",
        })
      }
    }
  }, [category, open, form])

  const handleLocalSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine title based on context
  const isAddingSub = category && !category.id;
  const isEditing = category && category.id;
  const title = isEditing ? "Cập nhật danh mục" : (isAddingSub ? "Thêm danh mục con" : "Thêm danh mục mới");
  const subTitle = isAddingSub ? `Trực thuộc: ${category.parentName}` : "Sắp xếp sản phẩm theo nhóm để quản lý hiệu quả hơn.";


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="p-8 pb-6 bg-slate-50/50 border-b border-slate-100">
          <div className="flex items-center gap-3 text-slate-400 mb-1">
            <FolderTree size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Phân loại hàng hóa</span>
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 uppercase">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            {subTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleLocalSubmit)} className="p-8 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
             <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mã danh mục *</Label>
                <Input 
                  {...form.register("categoryCode")} 
                  className="h-11 border-slate-200 focus:ring-slate-100 focus:border-slate-900 font-mono"
                />
             </div>

             <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trạng thái</Label>
                <Select 
                  defaultValue={form.getValues("status")}
                  onValueChange={(val) => form.setValue("status", val as any)}
                >
                  <SelectTrigger className="h-11 border-slate-200 focus:ring-slate-100 focus:border-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Hoạt động</SelectItem>
                    <SelectItem value="Inactive">Tạm ngưng</SelectItem>
                  </SelectContent>
                </Select>
             </div>

             <div className="space-y-2 col-span-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tên danh mục *</Label>
                <Input 
                    {...form.register("name")} 
                    className="h-11 border-slate-200 focus:ring-slate-100 focus:border-slate-900 font-bold" 
                />
             </div>

             <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Danh mục cha</Label>
                <Select 
                  value={form.watch("parentId")?.toString()}
                  onValueChange={(val) => form.setValue("parentId", parseInt(val))}
                >
                  <SelectTrigger className="h-11 border-slate-200 focus:ring-slate-100 focus:border-slate-900">
                    <SelectValue placeholder="Gốc (Root)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Gốc (Root)</SelectItem>
                    {allCategories.filter(c => c.id !== category?.id).map(cat => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
             </div>

             <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Thứ tự hiển thị</Label>
                <Input 
                    type="number"
                    {...form.register("sortOrder", { valueAsNumber: true })} 
                    className="h-11 border-slate-200 focus:ring-slate-100 focus:border-slate-900"
                />
             </div>

             <div className="space-y-2 col-span-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ghi chú / Mô tả</Label>
                <Textarea 
                  {...form.register("description")} 
                  className="h-24 border-slate-200 focus:ring-slate-100 focus:border-slate-900"
                />
             </div>
          </div>
        </form>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-11 px-6 border-slate-300 font-medium text-slate-600">
            Hủy bỏ
          </Button>
          <Button type="submit" disabled={isSubmitting} onClick={form.handleSubmit(handleLocalSubmit)} className="h-11 px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Lưu danh mục
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
