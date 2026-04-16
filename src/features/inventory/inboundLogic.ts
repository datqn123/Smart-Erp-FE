import type { StockReceipt, ReceiptStatus } from './types';

export interface InboundFilters {
  search: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  supplier: string;
}

export function sortByDate(receipts: StockReceipt[]): StockReceipt[] {
  return [...receipts].sort((a, b) =>
    new Date(b.receiptDate).getTime() - new Date(a.receiptDate).getTime()
  );
}

export function filterReceipts(receipts: StockReceipt[], filters: InboundFilters): StockReceipt[] {
  return receipts.filter(r => {
    const searchLower = filters.search.toLowerCase();
    if (filters.search) {
      const matchesSearch =
        r.receiptCode.toLowerCase().includes(searchLower) ||
        r.supplierName.toLowerCase().includes(searchLower) ||
        r.staffName.toLowerCase().includes(searchLower) ||
        (r.invoiceNumber?.toLowerCase().includes(searchLower) ?? false);
      if (!matchesSearch) return false;
    }
    if (filters.status && filters.status !== 'all') {
      if (r.status !== (filters.status as ReceiptStatus)) return false;
    }
    if (filters.dateFrom) {
      if (r.receiptDate < filters.dateFrom) return false;
    }
    if (filters.dateTo) {
      if (r.receiptDate > filters.dateTo) return false;
    }
    if (filters.supplier) {
      if (!r.supplierName.toLowerCase().includes(filters.supplier.toLowerCase())) return false;
    }
    return true;
  });
}

export function paginateReceipts(receipts: StockReceipt[], visibleCount: number): StockReceipt[] {
  return receipts.slice(0, visibleCount);
}
