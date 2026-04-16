export interface Transaction {
  id: number;
  transactionCode: string;
  type: "Income" | "Expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
}
