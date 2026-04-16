import type { Order } from "./types"

export const mockOrders: Order[] = [
  { id: 1, orderCode: "BB0001", customerName: "Công ty TNHH Tuấn Phát", totalAmount: 45000000, status: "Completed", date: "2024-03-01T10:00:00Z", type: "Wholesale" },
  { id: 2, orderCode: "BB0002", customerName: "Đại lý An Khang", totalAmount: 12000000, status: "Pending", date: "2024-03-02T14:30:00Z", type: "Wholesale" },
  { id: 3, orderCode: "BB0003", customerName: "Siêu thị Minh Mart", totalAmount: 89000000, status: "Completed", date: "2024-03-03T09:15:00Z", type: "Wholesale" },
]
