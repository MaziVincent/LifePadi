import { test, expect } from "@playwright/test";

test.describe("home page", () => {
	test("loads and shows the LifePadi brand", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/lifepadi/i);
	});

	test("has no console errors on initial render", async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));
		page.on("console", (msg) => {
			if (msg.type() === "error") errors.push(msg.text());
		});
		await page.goto("/");
		await page.waitForLoadState("networkidle");
		// Ignore third-party / network errors that show up as console.error in dev.
		const fatal = errors.filter(
			(e) => !/favicon|sourcemap|manifest|paystack|google/i.test(e),
		);
		expect(fatal, fatal.join("\n")).toEqual([]);
	});
});
