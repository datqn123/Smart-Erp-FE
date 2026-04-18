import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, X, Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { StockReceipt } from "../types"

const receiptSchema = z.object({
  supplierId: z.number().min(1, "Vui lòng chọn nhà cung cấp"),
  receiptDate: z.string().min(1, "Vui lòng chọn ngày"),
  invoiceNumber: z.string().optional(),
  notes: z.string().optional(),
  details: z.array(z.object({
    productId: z.number().min(1),
    quantity: z.number().min(1, "Số lượng phải > 0"),
    costPrice: z.number().min(0),
    batchNumber: z.string().optional(),
    expiryDate: z.string().optional(),
  })).min(1, "Phải có ít nhất 1 sản phẩm")
})

type ReceiptFormData = z.infer<typeof receiptSchema>

interface ReceiptFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  receipt?: StockReceipt
  onSubmit: (data: ReceiptFormData) => void
}

const mockSuppliers = [
  { id: 1, name: "Công ty TNHH Vinamilk" },
  { id: 2, name: "Nhà phân phối PepsiCo" },
  { id: 3, name: "Công ty Hàng Tiêu Dùng" },
  { id: 4, name: "Công ty Masan" },
  { id: 5, name: "Đại lý Unilever" },
]

const mockProducts = [
  { id: 1, name: "Sữa Ông Thọ", sku: "SP001", unit: "Hộp" },
  { id: 2, name: "Nước Ngọt Coca Cola", sku: "SP002", unit: "Chai" },
  { id: 3, name: "Bánh Quy Cosy", sku: "SP003", unit: "Gói" },
  { id: 5, name: "Mì Gói Hảo Hảo", sku: "SP005", unit: "Gói" },
]

export function ReceiptForm({ open, onOpenChange, receipt, onSubmit }: ReceiptFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: receipt ? {
      supplierId: receipt.supplierId,
      receiptDate: receipt.receiptDate,
      invoiceNumber: receipt.invoiceNumber || "",
      notes: receipt.notes || "",
      details: receipt.details.map(d => ({
        productId: d.productId,
        quantity: d.quantity,
        costPrice: d.costPrice,
        batchNumber: d.batchNumber || "",
        expiryDate: d.expiryDate || "",
      }))
    } : {
      supplierId: 0 as unknown as number,
      receiptDate: new Date().toISOString().split("T")[0],
      invoiceNumber: "",
      notes: "",
      details: [{ productId: 0 as unknown as number, quantity: 1, costPrice: 0, batchNumber: "", expiryDate: "" }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details"
  })

  const totalAmount = form.watch("details")?.reduce((sum, detail) => {
    return sum + ((detail.quantity || 0) * (detail.costPrice || 0))
  }, 0) || 0

  const handleSubmit = async (data: ReceiptFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditable = !receipt || receipt.status === "Draft"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {receipt ? (isEditable ? "Sửa phiếu nhập" : "Chi tiết phiếu nhập") : "Tạo phiếu nhập mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nhà cung cấp *</label>
              <Select 
                value={form.watch("supplierId")?.toString() || ""} 
                onValueChange={(val) => form.setValue("supplierId", parseInt(val))}
                disabled={!isEditable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhà cung cấp" />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map(s => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.supplierId && (
                <p className="text-sm text-red-500">{form.formState.errors.supplierId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày nhập *</label>
              <Input 
                type="date" 
                {...form.register("receiptDate")}
                disabled={!isEditable}
              />
              {form.formState.errors.receiptDate && (
                <p className="text-sm text-red-500">{form.formState.errors.receiptDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Số hóa đơn</label>
              <Input 
                placeholder="Nhập số hóa đơn" 
                {...form.register("invoiceNumber")}
                disabled={!isEditable}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tổng tiền</label>
              <Input 
                value={totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} 
                disabled
                className="bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ghi chú</label>
            <Textarea 
              placeholder="Nhập ghi chú" 
              {...form.register("notes")}
              disabled={!isEditable}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Chi tiết sản phẩm *</label>
              {isEditable && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ productId: 0 as unknown as number, quantity: 1, costPrice: 0, batchNumber: "", expiryDate: "" })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
                </Button>
              )}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {fields.map((field, index) => {
                const detail = form.watch(`details.${index}`)
                const product = mockProducts.find(p => p.id === detail?.productId)
                
                return (
                  <div key={field.id} className="flex gap-2 items-start p-3 border rounded-lg bg-slate-50">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <Select
                        value={detail?.productId?.toString() || ""}
                        onValueChange={(val) => form.setValue(`details.${index}.productId`, parseInt(val))}
                        disabled={!isEditable}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map(p => (
                            <SelectItem key={p.id} value={p.id.toString()}>{p.name} ({p.sku})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        placeholder="Số lượng"
                        {...form.register(`details.${index}.quantity`, { valueAsNumber: true })}
                        disabled={!isEditable}
                      />

                      <Input
                        type="number"
                        placeholder="Đơn giá"
                        {...form.register(`details.${index}.costPrice`, { valueAsNumber: true })}
                        disabled={!isEditable}
                      />

                      <Input
                        placeholder="Số lô (optional)"
                        {...form.register(`details.${index}.batchNumber`)}
                        disabled={!isEditable}
                      />
                    </div>
                    
                    {isEditable && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
            {form.formState.errors.details && (
              <p className="text-sm text-red-500">{form.formState.errors.details.message || form.formState.errors.details.root?.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            {isEditable && (
              <>
                <Button type="submit" variant="outline" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu nháp
                </Button>
                <Button type="submit" disabled={isSubmitting} onClick={() => {
                  form.setValue("invoiceNumber", form.getValues("invoiceNumber") || "")
                }}>
                  <Send className="h-4 w-4 mr-2" />
                  Gửi duyệt
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}