import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, X, Save, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { StockDispatch } from "../types"

const dispatchSchema = z.object({
  orderCode: z.string().min(1, "Vui lòng nhập mã đơn hàng"),
  customerName: z.string().min(1, "Vui lòng nhập tên khách hàng"),
  dispatchDate: z.string().min(1, "Vui lòng chọn ngày"),
  notes: z.string().optional(),
  items: z.array(z.object({
    productId: z.number().min(1, "Vui lòng chọn sản phẩm"),
    dispatchQty: z.number().min(1, "Số lượng phải > 0"),
    batchNumber: z.string().optional(),
    warehouseLocation: z.string().min(1, "Vui lòng chọn kho"),
    shelfCode: z.string().min(1, "Vui lòng chọn vị trí"),
  })).min(1, "Phải có ít nhất 1 sản phẩm")
})

type DispatchFormData = z.infer<typeof dispatchSchema>

interface DispatchFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dispatch?: StockDispatch
  onSubmit: (data: DispatchFormData) => void
}

const mockProducts = [
  { id: 1, name: "Sữa Ông Thọ", sku: "SP001", unit: "Hộp" },
  { id: 2, name: "Nước Ngọt Coca Cola", sku: "SP002", unit: "Chai" },
  { id: 3, name: "Bánh Quy Cosy", sku: "SP003", unit: "Gói" },
  { id: 5, name: "Mì Gói Hảo Hảo", sku: "SP005", unit: "Gói" },
]

const mockLocations = [
  { id: "WH01", name: "Kho Chính" },
  { id: "WH02", name: "Kho Phụ" },
]

const mockShelves = ["A1", "A2", "B1", "B2", "C1", "C2"]

export function DispatchForm({ open, onOpenChange, dispatch, onSubmit }: DispatchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<DispatchFormData>({
    resolver: zodResolver(dispatchSchema),
    defaultValues: dispatch ? {
      orderCode: dispatch.orderCode,
      customerName: dispatch.customerName,
      dispatchDate: dispatch.dispatchDate,
      notes: dispatch.notes || "",
      items: dispatch.items.map(i => ({
        productId: i.productId,
        dispatchQty: i.dispatchQty,
        batchNumber: i.batchNumber || "",
        warehouseLocation: i.warehouseLocation,
        shelfCode: i.shelfCode,
      }))
    } : {
      orderCode: "",
      customerName: "",
      dispatchDate: new Date().toISOString().split("T")[0],
      notes: "",
      items: [{ productId: 0 as unknown as number, dispatchQty: 1, batchNumber: "", warehouseLocation: "WH01", shelfCode: "A1" }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  })

  const handleSubmit = async (data: DispatchFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditable = !dispatch || (dispatch.status !== "Cancelled" && dispatch.status !== "Full")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {dispatch ? (isEditable ? "Sửa phiếu xuất" : "Chi tiết phiếu xuất") : "Tạo phiếu xuất mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mã đơn hàng *</label>
              <Input 
                placeholder="VD: ORD-2026-0001"
                {...form.register("orderCode")}
                disabled={!isEditable}
              />
              {form.formState.errors.orderCode && (
                <p className="text-sm text-red-500">{form.formState.errors.orderCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tên khách hàng *</label>
              <Input 
                placeholder="Nhập tên khách hàng" 
                {...form.register("customerName")}
                disabled={!isEditable}
              />
              {form.formState.errors.customerName && (
                <p className="text-sm text-red-500">{form.formState.errors.customerName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày xuất *</label>
              <Input 
                type="date" 
                {...form.register("dispatchDate")}
                disabled={!isEditable}
              />
              {form.formState.errors.dispatchDate && (
                <p className="text-sm text-red-500">{form.formState.errors.dispatchDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ghi chú</label>
            <Textarea 
              placeholder="Nhập ghi chú xuất kho" 
              {...form.register("notes")}
              disabled={!isEditable}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Danh sách sản phẩm *</label>
              {isEditable && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ productId: 0 as unknown as number, dispatchQty: 1, batchNumber: "", warehouseLocation: "WH01", shelfCode: "A1" })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg bg-slate-50 space-y-3 relative">
                  {isEditable && fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Sản phẩm</label>
                      <Select
                        value={form.watch(`items.${index}.productId`)?.toString() || ""}
                        onValueChange={(val) => form.setValue(`items.${index}.productId`, parseInt(val))}
                        disabled={!isEditable}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map(p => (
                            <SelectItem key={p.id} value={p.id.toString()}>{p.name} ({p.sku})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Số lượng xuất</label>
                      <Input
                        type="number"
                        placeholder="Số lượng"
                        {...form.register(`items.${index}.dispatchQty`, { valueAsNumber: true })}
                        className="bg-white"
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Kho</label>
                      <Select
                        value={form.watch(`items.${index}.warehouseLocation`)}
                        onValueChange={(val) => form.setValue(`items.${index}.warehouseLocation`, val)}
                        disabled={!isEditable}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Chọn kho" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockLocations.map(loc => (
                            <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Vị trí (Kệ)</label>
                      <Select
                        value={form.watch(`items.${index}.shelfCode`)}
                        onValueChange={(val) => form.setValue(`items.${index}.shelfCode`, val)}
                        disabled={!isEditable}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockShelves.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Số lô (Tùy chọn)</label>
                      <Input
                        placeholder="Số lô"
                        {...form.register(`items.${index}.batchNumber`)}
                        className="bg-white"
                        disabled={!isEditable}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {form.formState.errors.items && (
              <p className="text-sm text-red-500">{form.formState.errors.items.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            {isEditable && (
              <Button type="submit" disabled={isSubmitting}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Xác nhận xuất kho
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
