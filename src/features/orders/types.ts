export interface Order {
  id: number;
  orderCode: string;
  customerName: string;
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  date: string;
  type: "Wholesale" | "Retail" | "Return";
}
