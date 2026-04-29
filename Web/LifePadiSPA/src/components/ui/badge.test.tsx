import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
	it("renders text content", () => {
		render(<Badge>New</Badge>);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("applies the default variant by default", () => {
		render(<Badge data-testid="badge">Default</Badge>);
		const el = screen.getByTestId("badge");
		expect(el.className).toMatch(/bg-primary/);
	});

	it("applies the secondary variant", () => {
		render(
			<Badge data-testid="badge" variant="secondary">
				Sec
			</Badge>,
		);
		expect(screen.getByTestId("badge").className).toMatch(/bg-secondary/);
	});
});
