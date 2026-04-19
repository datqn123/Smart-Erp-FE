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

export interface Debt {
  id: number;
  debtCode: string;
  partnerName: string;
  partnerType: "Customer" | "Supplier";
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  lastUpdate: string;
  status: "InDebt" | "Cleared";
}

export interface LedgerEntry {
  id: number;
  date: string;
  transactionCode: string; // Reference code
  description: string;
  debit: number; // Phát sinh Nợ (usually Expense or Outflow) - in accounting terms might vary
  credit: number; // Phát sinh Có (usually Income or Inflow)
  balance: number; // Số dư sau giao dịch
}
