import { Link } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";

const links = [
	{
		title: "Company",
		items: [
			{ label: "About", to: "/about" },
			{ label: "Contact", to: "/contact" },
			{ label: "FAQ", to: "/faq" },
		],
	},
	{
		title: "Services",
		items: [
			{ label: "Shop", to: "/shop" },
			{ label: "Logistics", to: "/logistics" },
		],
	},
	{
		title: "Legal",
		items: [
			{ label: "Privacy Policy", to: "/privacypolicy" },
			{ label: "Terms & Conditions", to: "/termsandconditions" },
		],
	},
];

export function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="container grid gap-10 py-12 md:grid-cols-4">
				<div>
					<Link to="/" className="inline-flex items-center gap-2">
						<Logo className="h-8 w-auto" />
					</Link>
					<p className="mt-3 max-w-xs text-sm text-muted-foreground">
						LifePadi makes errands, deliveries and shopping effortless across
						Nigeria.
					</p>
				</div>
				{links.map((group) => (
					<div key={group.title}>
						<h4 className="text-sm font-semibold">{group.title}</h4>
						<ul className="mt-3 space-y-2 text-sm">
							{group.items.map((item) => (
								<li key={item.to}>
									<Link
										to={item.to}
										className="text-muted-foreground transition-colors hover:text-foreground">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className="border-t">
				<div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
					<span>
						&copy; {new Date().getFullYear()} LifePadi. All rights reserved.
					</span>
					<span>Made with care.</span>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
