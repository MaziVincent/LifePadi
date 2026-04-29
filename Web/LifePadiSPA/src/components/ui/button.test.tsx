import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button", () => {
	it("renders its children", () => {
		render(<Button>Continue</Button>);
		expect(
			screen.getByRole("button", { name: /continue/i }),
		).toBeInTheDocument();
	});

	it("calls onClick when activated", async () => {
		const onClick = vi.fn();
		const user = userEvent.setup();
		render(<Button onClick={onClick}>Press</Button>);
		await user.click(screen.getByRole("button", { name: /press/i }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("respects the disabled prop", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
	});

	it("applies the destructive variant class", () => {
		render(<Button variant="destructive">Delete</Button>);
		expect(screen.getByRole("button", { name: /delete/i }).className).toMatch(
			/destructive/,
		);
	});
});
