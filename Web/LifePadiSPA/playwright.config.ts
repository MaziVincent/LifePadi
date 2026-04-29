import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for LifePadi SPA e2e tests.
 *
 * - `testDir` is `e2e/` so unit tests under `src/` are not picked up.
 * - The local dev server is started via `npm run dev` on port 5173.
 * - Override `PLAYWRIGHT_BASE_URL` to run against staging or prod.
 */
export default defineConfig({
	testDir: "./e2e",
	timeout: 30_000,
	fullyParallel: true,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:5173",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: "npm run dev",
				url: "http://localhost:5173",
				reuseExistingServer: !process.env.CI,
				timeout: 60_000,
			},
});
