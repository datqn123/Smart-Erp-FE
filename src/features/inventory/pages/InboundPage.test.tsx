import { render } from "@testing-library/react"
import { InboundPage } from "./InboundPage"
import { describe, it, expect, vi } from "vitest"
import { PageTitleProvider } from "@/context/PageTitleContext"

// Mock lucide-react to avoid icon rendering issues in tests
vi.mock("lucide-react", () => ({
  Plus: () => <div data-testid="plus-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Camera: () => <div data-testid="camera-icon" />,
}))

// Mock components used in InboundPage
vi.mock("../components/ReceiptTable", () => ({
  ReceiptTable: () => <div data-testid="receipt-table" />,
  ReceiptTableHeader: () => <div data-testid="receipt-table-header" />,
}))

vi.mock("../components/ReceiptDetailPanel", () => ({
  ReceiptDetailPanel: () => <div data-testid="receipt-detail-panel" />,
}))

// Mock IntersectionObserver
vi.stubGlobal("IntersectionObserver", class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
})

describe("InboundPage Render Test", () => {
  it("should render without crashing", () => {
    // This test is expected to FAIL to compile/run because of the syntax error in InboundPage.tsx
    render(
      <PageTitleProvider>
        <InboundPage />
      </PageTitleProvider>
    )
    expect(true).toBe(true)
  })
})
