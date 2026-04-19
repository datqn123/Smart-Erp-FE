# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\dispatch-details.spec.ts >> verify dispatch details and form expansion
- Location: e2e\dispatch-details.spec.ts:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/inventory/dispatch
Call log:
  - navigating to "http://localhost:5173/inventory/dispatch", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('verify dispatch details and form expansion', async ({ page }) => {
> 4  |   await page.goto('http://localhost:5173/inventory/dispatch');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/inventory/dispatch
  5  |   
  6  |   // 1. Verify Detail Dialog
  7  |   // Open the first row
  8  |   await page.locator('[data-testid="dispatch-table"] tbody tr').first().click();
  9  |   
  10 |   const detailDialog = page.locator('role=dialog');
  11 |   await expect(detailDialog).toBeVisible();
  12 |   
  13 |   // Check if it's wide (5xl) - check bounding box
  14 |   const box = await detailDialog.boundingBox();
  15 |   expect(box?.width).toBeGreaterThan(800);
  16 |   
  17 |   // Check for picking list title
  18 |   await expect(page.getByText('Picking List', { exact: false })).toBeVisible();
  19 |   
  20 |   // Close dialog
  21 |   await page.keyboard.press('Escape');
  22 |   
  23 |   // 2. Verify Form Expansion
  24 |   // Click "Tạo phiếu xuất"
  25 |   await page.getByText('Tạo phiếu xuất').click();
  26 |   
  27 |   const formDialog = page.locator('role=dialog');
  28 |   await expect(formDialog).toBeVisible();
  29 |   
  30 |   // Check if it's very wide (7xl)
  31 |   const formBox = await formDialog.boundingBox();
  32 |   expect(formBox?.width).toBeGreaterThan(1200);
  33 |   
  34 |   // Check for Table headers in form
  35 |   await expect(page.getByText('Sản phẩm xuất', { exact: true })).toBeVisible();
  36 |   await expect(page.getByText('Vị trí (Kệ)', { exact: true })).toBeVisible();
  37 | });
  38 | 
```