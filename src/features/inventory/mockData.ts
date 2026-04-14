import type { InventoryItem, StockReceipt, ReceiptDetailItem, StockDispatch, DispatchItem, AuditSession, AuditItem } from "./types";

// ==========================================
// Mock Data - Inventory (Task004)
// ==========================================

export const mockInventory: InventoryItem[] = [
  {
    id: 1, productId: 1, productName: "Sữa Ông Thọ Hộp Giấy", skuCode: "SP001",
    locationId: 1, warehouseCode: "WH01", shelfCode: "A1",
    batchNumber: "B2026001", expiryDate: "2026-12-31",
    quantity: 150, minQuantity: 50, unitName: "Hộp", costPrice: 25000,
    updatedAt: "2026-04-12T10:30:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 3750000,
  },
  {
    id: 2, productId: 2, productName: "Nước Ngọt Coca Cola 1.5L", skuCode: "SP002",
    locationId: 2, warehouseCode: "WH01", shelfCode: "B2",
    batchNumber: "B2026002", expiryDate: "2027-06-15",
    quantity: 45, minQuantity: 50, unitName: "Chai", costPrice: 12000,
    updatedAt: "2026-04-11T14:20:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 540000,
  },
  {
    id: 3, productId: 3, productName: "Bánh Quy Cosy", skuCode: "SP003",
    locationId: 3, warehouseCode: "WH01", shelfCode: "C1",
    expiryDate: "2026-05-10",
    quantity: 80, minQuantity: 30, unitName: "Gói", costPrice: 8000,
    updatedAt: "2026-04-10T09:15:00Z", isLowStock: false, isExpiringSoon: true, totalValue: 640000,
  },
  {
    id: 4, productId: 4, productName: "Dầu Ăn Simply 1L", skuCode: "SP004",
    locationId: 1, warehouseCode: "WH01", shelfCode: "A2",
    quantity: 0, minQuantity: 20, unitName: "Chai", costPrice: 35000,
    updatedAt: "2026-04-09T16:45:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 0,
  },
  {
    id: 5, productId: 5, productName: "Mì Gói Hảo Hảo", skuCode: "SP005",
    locationId: 4, warehouseCode: "WH01", shelfCode: "D1",
    batchNumber: "B2026005", expiryDate: "2027-01-20",
    quantity: 500, minQuantity: 100, unitName: "Gói", costPrice: 3500,
    updatedAt: "2026-04-12T08:00:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 1750000,
  },
  {
    id: 6, productId: 6, productName: "Nước Tương Chin-Su", skuCode: "SP006",
    locationId: 2, warehouseCode: "WH01", shelfCode: "B1",
    quantity: 25, minQuantity: 30, unitName: "Chai", costPrice: 18000,
    updatedAt: "2026-04-08T11:30:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 450000,
  },
  {
    id: 7, productId: 7, productName: "Bột Giặt OMO 3kg", skuCode: "SP007",
    locationId: 5, warehouseCode: "WH01", shelfCode: "E1",
    expiryDate: "2028-03-15",
    quantity: 60, minQuantity: 20, unitName: "Bao", costPrice: 85000,
    updatedAt: "2026-04-07T13:00:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 5100000,
  },
  {
    id: 8, productId: 8, productName: "Cà Phê Trung Nguyên", skuCode: "SP008",
    locationId: 1, warehouseCode: "WH01", shelfCode: "A3",
    batchNumber: "B2026008", expiryDate: "2026-04-25",
    quantity: 35, minQuantity: 25, unitName: "Hộp", costPrice: 45000,
    updatedAt: "2026-04-06T10:00:00Z", isLowStock: false, isExpiringSoon: true, totalValue: 1575000,
  },
  {
    id: 9, productId: 9, productName: "Nước Mắm Nam Ngư", skuCode: "SP009",
    locationId: 2, warehouseCode: "WH01", shelfCode: "B3",
    quantity: 120, minQuantity: 40, unitName: "Chai", costPrice: 22000,
    updatedAt: "2026-04-12T10:30:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 2640000,
  },
  {
    id: 10, productId: 10, productName: "Gạo ST25 (Túi 5kg)", skuCode: "SP010",
    locationId: 6, warehouseCode: "WH01", shelfCode: "F1",
    quantity: 80, minQuantity: 30, unitName: "Túi", costPrice: 185000,
    updatedAt: "2026-04-10T14:20:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 14800000,
  },
  {
    id: 11, productId: 11, productName: "Đường Tinh Luyện Biên Hòa", skuCode: "SP011",
    locationId: 4, warehouseCode: "WH01", shelfCode: "D2",
    quantity: 200, minQuantity: 50, unitName: "Gói", costPrice: 20000,
    updatedAt: "2026-04-11T09:15:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 4000000,
  },
  {
    id: 12, productId: 12, productName: "Muối I-ốt Hảo Hảo", skuCode: "SP012",
    locationId: 4, warehouseCode: "WH01", shelfCode: "D3",
    quantity: 15, minQuantity: 50, unitName: "Gói", costPrice: 5000,
    updatedAt: "2026-04-09T16:45:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 75000,
  },
  {
    id: 13, productId: 13, productName: "Trà Xanh Không Độ", skuCode: "SP013",
    locationId: 2, warehouseCode: "WH01", shelfCode: "B4",
    quantity: 300, minQuantity: 100, unitName: "Chai", costPrice: 8000,
    updatedAt: "2026-04-12T08:00:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 2400000,
  },
  {
    id: 14, productId: 14, productName: "Kem Đánh Răng P/S", skuCode: "SP014",
    locationId: 5, warehouseCode: "WH01", shelfCode: "E2",
    quantity: 110, minQuantity: 40, unitName: "Hộp", costPrice: 32000,
    updatedAt: "2026-04-08T11:30:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 3520000,
  },
  {
    id: 15, productId: 15, productName: "Sữa Tắm Lifebuoy", skuCode: "SP015",
    locationId: 5, warehouseCode: "WH01", shelfCode: "E3",
    quantity: 0, minQuantity: 30, unitName: "Chai", costPrice: 75000,
    updatedAt: "2026-04-07T13:00:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 0,
  },
  {
    id: 16, productId: 16, productName: "Mì Tôm Omachi", skuCode: "SP016",
    locationId: 4, warehouseCode: "WH01", shelfCode: "D4",
    batchNumber: "B2026016", expiryDate: "2026-05-01",
    quantity: 450, minQuantity: 100, unitName: "Gói", costPrice: 6500,
    updatedAt: "2026-04-06T10:00:00Z", isLowStock: false, isExpiringSoon: true, totalValue: 2925000,
  },
  {
    id: 17, productId: 17, productName: "Dầu Gội Clear", skuCode: "SP017",
    locationId: 5, warehouseCode: "WH01", shelfCode: "E4",
    quantity: 85, minQuantity: 30, unitName: "Chai", costPrice: 68000,
    updatedAt: "2026-04-12T10:30:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 5780000,
  },
  {
    id: 18, productId: 18, productName: "Sữa Chua Vinamilk", skuCode: "SP018",
    locationId: 1, warehouseCode: "WH01", shelfCode: "A4",
    batchNumber: "B2026018", expiryDate: "2026-04-18",
    quantity: 120, minQuantity: 50, unitName: "Lốc", costPrice: 24000,
    updatedAt: "2026-04-10T14:20:00Z", isLowStock: false, isExpiringSoon: true, totalValue: 2880000,
  },
  {
    id: 19, productId: 19, productName: "Bánh Chocopie", skuCode: "SP019",
    locationId: 3, warehouseCode: "WH01", shelfCode: "C2",
    quantity: 210, minQuantity: 60, unitName: "Hộp", costPrice: 48000,
    updatedAt: "2026-04-11T09:15:00Z", isLowStock: false, isExpiringSoon: false, totalValue: 10080000,
  },
  {
    id: 20, productId: 20, productName: "Xúc Xích Vissan", skuCode: "SP020",
    locationId: 1, warehouseCode: "WH01", shelfCode: "A5",
    quantity: 25, minQuantity: 50, unitName: "Gói", costPrice: 38000,
    updatedAt: "2026-04-09T16:45:00Z", isLowStock: true, isExpiringSoon: false, totalValue: 950000,
  },
];

export const mockInventoryKPIs = {
  totalSKUs: 8,
  totalValue: 13805000,
  lowStockCount: 3,
  expiringSoonCount: 2,
};

// ==========================================
// Mock Data - Stock Receipts (Task005)
// ==========================================

const mockReceiptDetails: ReceiptDetailItem[][] = [
  [
    { id: 1, receiptId: 1, productId: 1, productName: "Sữa Ông Thọ Hộp Giấy", skuCode: "SP001", unitId: 1, unitName: "Hộp", quantity: 200, costPrice: 25000, batchNumber: "B2026009", expiryDate: "2027-01-15", lineTotal: 5000000 },
    { id: 2, receiptId: 1, productId: 5, productName: "Mì Gói Hảo Hảo", skuCode: "SP005", unitId: 5, unitName: "Gói", quantity: 300, costPrice: 3500, lineTotal: 1050000 },
  ],
  [
    { id: 3, receiptId: 2, productId: 2, productName: "Nước Ngọt Coca Cola 1.5L", skuCode: "SP002", unitId: 2, unitName: "Chai", quantity: 100, costPrice: 12000, batchNumber: "B2026010", expiryDate: "2027-06-15", lineTotal: 1200000 },
  ],
  [
    { id: 4, receiptId: 3, productId: 7, productName: "Bột Giặt OMO 3kg", skuCode: "SP007", unitId: 7, unitName: "Bao", quantity: 50, costPrice: 85000, lineTotal: 4250000 },
    { id: 5, receiptId: 3, productId: 6, productName: "Nước Tương Chin-Su", skuCode: "SP006", unitId: 6, unitName: "Chai", quantity: 40, costPrice: 18000, lineTotal: 720000 },
    { id: 6, receiptId: 3, productId: 3, productName: "Bánh Quy Cosy", skuCode: "SP003", unitId: 3, unitName: "Gói", quantity: 100, costPrice: 8000, lineTotal: 800000 },
  ],
];

export const mockStockReceipts: StockReceipt[] = [
  {
    id: 1, receiptCode: "PN-2026-0001", supplierId: 1, supplierName: "Công ty TNHH Vinamilk",
    staffId: 2, staffName: "Nguyễn Văn A", receiptDate: "2026-04-10",
    status: "Approved", invoiceNumber: "INV-2026-001", totalAmount: 6050000,
    notes: "Nhập hàng tháng 4", approvedBy: 1, approvedByName: "Trần Quản Lý",
    approvedAt: "2026-04-11T09:00:00Z", createdAt: "2026-04-10T14:00:00Z", updatedAt: "2026-04-11T09:00:00Z",
    details: mockReceiptDetails[0],
  },
  {
    id: 2, receiptCode: "PN-2026-0002", supplierId: 2, supplierName: "Nhà phân phối PepsiCo",
    staffId: 2, staffName: "Nguyễn Văn A", receiptDate: "2026-04-12",
    status: "Pending", invoiceNumber: "INV-2026-002", totalAmount: 1200000,
    notes: "Chờ phê duyệt", createdAt: "2026-04-12T10:00:00Z", updatedAt: "2026-04-12T10:00:00Z",
    details: mockReceiptDetails[1],
  },
  {
    id: 3, receiptCode: "PN-2026-0003", supplierId: 3, supplierName: "Công ty Hàng Tiêu Dùng",
    staffId: 3, staffName: "Lê Thị B", receiptDate: "2026-04-13",
    status: "Draft", totalAmount: 5770000,
    notes: "Phiếu nháp", createdAt: "2026-04-13T08:00:00Z", updatedAt: "2026-04-13T08:00:00Z",
    details: mockReceiptDetails[2],
  },
  {
    id: 4, receiptCode: "PN-2026-0004", supplierId: 1, supplierName: "Công ty TNHH Vinamilk",
    staffId: 2, staffName: "Nguyễn Văn A", receiptDate: "2026-04-08",
    status: "Rejected", totalAmount: 2500000,
    notes: "Sai đơn giá", approvedBy: 1, approvedByName: "Trần Quản Lý",
    approvedAt: "2026-04-09T10:00:00Z", createdAt: "2026-04-08T11:00:00Z", updatedAt: "2026-04-09T10:00:00Z",
    details: [],
  },
];

// ==========================================
// Mock Data - Stock Dispatch (Task006)
// ==========================================

const mockDispatchItems: DispatchItem[][] = [
  [
    { id: 1, dispatchId: 1, orderDetailId: 1, productId: 1, productName: "Sữa Ông Thọ Hộp Giấy", skuCode: "SP001", unitId: 1, unitName: "Hộp", orderedQty: 20, alreadyDispatchedQty: 0, remainingQty: 20, dispatchQty: 20, warehouseLocation: "WH01", shelfCode: "A1", batchNumber: "B2026001", availableStock: 150, isFullyDispatched: true },
    { id: 2, dispatchId: 1, orderDetailId: 2, productId: 5, productName: "Mì Gói Hảo Hảo", skuCode: "SP005", unitId: 5, unitName: "Gói", orderedQty: 50, alreadyDispatchedQty: 0, remainingQty: 50, dispatchQty: 50, warehouseLocation: "WH01", shelfCode: "D1", availableStock: 500, isFullyDispatched: true },
  ],
  [
    { id: 3, dispatchId: 2, orderDetailId: 3, productId: 2, productName: "Nước Ngọt Coca Cola 1.5L", skuCode: "SP002", unitId: 2, unitName: "Chai", orderedQty: 60, alreadyDispatchedQty: 0, remainingQty: 60, dispatchQty: 40, warehouseLocation: "WH01", shelfCode: "B2", availableStock: 45, isFullyDispatched: false },
  ],
];

export const mockStockDispatchs: StockDispatch[] = [
  {
    id: 1, dispatchCode: "PX-2026-0001", orderId: 1, orderCode: "SO-2026-0001",
    customerName: "Nguyễn Thị C", userId: 2, userName: "Nguyễn Văn A",
    dispatchDate: "2026-04-12", status: "Full",
    notes: "Xuất đủ hàng", createdAt: "2026-04-12T08:00:00Z", updatedAt: "2026-04-12T09:00:00Z",
    items: mockDispatchItems[0],
  },
  {
    id: 2, dispatchCode: "PX-2026-0002", orderId: 2, orderCode: "SO-2026-0002",
    customerName: "Trần Văn D", userId: 3, userName: "Lê Thị B",
    dispatchDate: "2026-04-13", status: "Partial",
    notes: "Không đủ hàng, đã tạo backorder", createdAt: "2026-04-13T10:00:00Z", updatedAt: "2026-04-13T11:00:00Z",
    items: mockDispatchItems[1],
  },
  {
    id: 3, dispatchCode: "PX-2026-0003", orderId: 3, orderCode: "SO-2026-0003",
    customerName: "Phạm Thị E", userId: 2, userName: "Nguyễn Văn A",
    dispatchDate: "2026-04-13", status: "Pending",
    notes: "Chờ xuất kho", createdAt: "2026-04-13T14:00:00Z", updatedAt: "2026-04-13T14:00:00Z",
    items: [],
  },
];

// ==========================================
// Mock Data - Inventory Audit (Task007)
// ==========================================

const mockAuditItems: AuditItem[][] = [
  [
    { id: 1, auditSessionId: 1, productId: 1, productName: "Sữa Ông Thọ Hộp Giấy", skuCode: "SP001", unitName: "Hộp", locationId: 1, warehouseCode: "WH01", shelfCode: "A1", batchNumber: "B2026001", systemQuantity: 150, actualQuantity: 148, variance: -2, variancePercent: -1.33, isCounted: true, notes: "Thiếu 2 hộp" },
    { id: 2, auditSessionId: 1, productId: 2, productName: "Nước Ngọt Coca Cola 1.5L", skuCode: "SP002", unitName: "Chai", locationId: 2, warehouseCode: "WH01", shelfCode: "B2", systemQuantity: 45, actualQuantity: 45, variance: 0, variancePercent: 0, isCounted: true },
    { id: 3, auditSessionId: 1, productId: 5, productName: "Mì Gói Hảo Hảo", skuCode: "SP005", unitName: "Gói", locationId: 4, warehouseCode: "WH01", shelfCode: "D1", systemQuantity: 500, actualQuantity: 505, variance: 5, variancePercent: 1, isCounted: true, notes: "Thừa 5 gói" },
    { id: 4, auditSessionId: 1, productId: 7, productName: "Bột Giặt OMO 3kg", skuCode: "SP007", unitName: "Bao", locationId: 5, warehouseCode: "WH01", shelfCode: "E1", systemQuantity: 60, actualQuantity: 60, variance: 0, variancePercent: 0, isCounted: true },
    { id: 5, auditSessionId: 1, productId: 3, productName: "Bánh Quy Cosy", skuCode: "SP003", unitName: "Gói", locationId: 3, warehouseCode: "WH01", shelfCode: "C1", systemQuantity: 80, actualQuantity: 75, variance: -5, variancePercent: -6.25, isCounted: true, notes: "Thiếu 5 gói, có thể do vỡ" },
    { id: 6, auditSessionId: 1, productId: 8, productName: "Cà Phê Trung Nguyên", skuCode: "SP008", unitName: "Hộp", locationId: 1, warehouseCode: "WH01", shelfCode: "A3", systemQuantity: 35, actualQuantity: 35, variance: 0, variancePercent: 0, isCounted: true },
  ],
  [
    { id: 7, auditSessionId: 2, productId: 1, productName: "Sữa Ông Thọ Hộp Giấy", skuCode: "SP001", unitName: "Hộp", locationId: 1, warehouseCode: "WH01", shelfCode: "A1", systemQuantity: 150, actualQuantity: 148, variance: -2, variancePercent: -1.33, isCounted: true },
    { id: 8, auditSessionId: 2, productId: 4, productName: "Dầu Ăn Simply 1L", skuCode: "SP004", unitName: "Chai", locationId: 1, warehouseCode: "WH01", shelfCode: "A2", systemQuantity: 0, actualQuantity: undefined, variance: 0, variancePercent: 0, isCounted: false },
    { id: 9, auditSessionId: 2, productId: 6, productName: "Nước Tương Chin-Su", skuCode: "SP006", unitName: "Chai", locationId: 2, warehouseCode: "WH01", shelfCode: "B1", systemQuantity: 25, actualQuantity: undefined, variance: 0, variancePercent: 0, isCounted: false },
  ],
];

export const mockAuditSessions: AuditSession[] = [
  {
    id: 1, auditCode: "KK-2026-0001", title: "Kiểm kê cuối tháng 3",
    auditDate: "2026-03-31", status: "Completed",
    locationFilter: "WH01", notes: "Kiểm kê toàn bộ kho chính",
    createdBy: 2, createdByName: "Nguyễn Văn A",
    completedAt: "2026-04-01T16:00:00Z", completedByName: "Trần Quản Lý",
    createdAt: "2026-03-31T08:00:00Z", updatedAt: "2026-04-01T16:00:00Z",
    items: mockAuditItems[0],
  },
  {
    id: 2, auditCode: "KK-2026-0002", title: "Kiểm kê kho A1 - Tháng 4",
    auditDate: "2026-04-13", status: "In Progress",
    locationFilter: "WH01-A1",
    createdBy: 3, createdByName: "Lê Thị B",
    createdAt: "2026-04-13T08:00:00Z", updatedAt: "2026-04-13T10:00:00Z",
    items: mockAuditItems[1],
  },
  {
    id: 3, auditCode: "KK-2026-0003", title: "Kiểm kê nhóm hàng tiêu dùng",
    auditDate: "2026-04-15", status: "Pending",
    categoryFilter: "CAT001",
    createdBy: 2, createdByName: "Nguyễn Văn A",
    createdAt: "2026-04-13T09:00:00Z", updatedAt: "2026-04-13T09:00:00Z",
    items: [],
  },
];
