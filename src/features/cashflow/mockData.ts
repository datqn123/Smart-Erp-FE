import type { Transaction, Debt, LedgerEntry } from "./types"

export const mockTransactions: Transaction[] = [
  { id: 1, transactionCode: "PT0001", type: "Income", amount: 45000000, category: "Thu tiền khách hàng", description: "Thu tiền đơn hàng BB0001", date: "2024-03-01T10:00:00Z", status: "Completed" },
  { id: 2, transactionCode: "PC0001", type: "Expense", amount: 15000000, category: "Thanh toán NCC", description: "Trả tiền nhập hàng Vinamilk", date: "2024-03-02T14:30:00Z", status: "Completed" },
  { id: 3, transactionCode: "PT0002", type: "Income", amount: 89000000, category: "Thu tiền khách hàng", description: "Thu tiền đơn hàng BB0003", date: "2024-03-03T09:15:00Z", status: "Completed" },
]

export const mockDebts: Debt[] = [
  { 
    id: 1, 
    debtCode: "NO0001", 
    partnerName: "Nguyễn Văn A", 
    partnerType: "Customer", 
    totalAmount: 12000000, 
    paidAmount: 5000000, 
    remainingAmount: 7000000, 
    lastUpdate: "2024-03-01T10:00:00Z", 
    status: "InDebt" 
  },
  { 
    id: 2, 
    debtCode: "NO0002", 
    partnerName: "Công ty Sữa Vinamilk", 
    partnerType: "Supplier", 
    totalAmount: 50000000, 
    paidAmount: 50000000, 
    remainingAmount: 0, 
    lastUpdate: "2024-03-02T14:30:00Z", 
    status: "Cleared" 
  },
  { 
    id: 3, 
    debtCode: "NO0003", 
    partnerName: "Trần Thị B", 
    partnerType: "Customer", 
    totalAmount: 2500000, 
    paidAmount: 0, 
    remainingAmount: 2500000, 
    lastUpdate: "2024-03-03T09:15:00Z", 
    status: "InDebt" 
  },
]

export const mockLedger: LedgerEntry[] = [
  { id: 1, date: "2024-03-01", transactionCode: "PT0001", description: "Thu tiền bán lẻ", debit: 0, credit: 45000000, balance: 45000000 },
  { id: 2, date: "2024-03-02", transactionCode: "PC0001", description: "Trả tiền nhà cung cấp", debit: 15000000, credit: 0, balance: 30000000 },
  { id: 3, date: "2024-03-03", transactionCode: "PT0002", description: "Thu tiền đại lý", debit: 0, credit: 89000000, balance: 119000000 },
]
