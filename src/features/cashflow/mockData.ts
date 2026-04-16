import type { Transaction } from "./types"

export const mockTransactions: Transaction[] = [
  { id: 1, transactionCode: "PT0001", type: "Income", amount: 45000000, category: "Thu tiền khách hàng", description: "Thu tiền đơn hàng BB0001", date: "2024-03-01T10:00:00Z", status: "Completed" },
  { id: 2, transactionCode: "PC0001", type: "Expense", amount: 15000000, category: "Thanh toán NCC", description: "Trả tiền nhập hàng Vinamilk", date: "2024-03-02T14:30:00Z", status: "Completed" },
  { id: 3, transactionCode: "PT0002", type: "Income", amount: 89000000, category: "Thu tiền khách hàng", description: "Thu tiền đơn hàng BB0003", date: "2024-03-03T09:15:00Z", status: "Completed" },
]
