import { render, screen } from "@testing-library/react"
import { DispatchPage } from "./DispatchPage"
import { describe, it, expect, vi } from "vitest"
import { PageTitleProvider } from "@/context/PageTitleContext"

// Mock lucide-react
vi.mock("lucide-react", () => ({
  MapPin: () => <div data-testid="map-pin-icon" />,
  Truck: () => <div data-testid="truck-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Package: () => <div data-testid="package-icon" />,
}))

// Mock IntersectionObserver
vi.stubGlobal("IntersectionObserver", class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
})

describe("DispatchPage Layout Test", () => {
  it("should have a standalone header container", () => {
    render(
      <PageTitleProvider>
        <DispatchPage />
      </PageTitleProvider>
    )
    
    // Kiểm tra cấu trúc wrapper theo SRS (flex-col, rounded-xl)
    const tableWrapper = screen.getByTestId("dispatch-list-container").parentElement;
    expect(tableWrapper?.className).toContain("rounded-xl");
    expect(tableWrapper?.className).toContain("shadow-md");
    
    // Tìm Header Component độc lập (thường được đặt trong một div phía trên list container)
    const headerContainer = tableWrapper?.querySelector(".bg-slate-50.border-b");
    expect(headerContainer).toBeTruthy();
  })
})
