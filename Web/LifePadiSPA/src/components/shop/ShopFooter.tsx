import { Link } from "react-router-dom";
import ResponsiveLogo from "../shared/ResponsiveLogo";

const year = new Date().getFullYear();

const ShopFooter = () => {
	return (
		<footer className="border-t border-border bg-background text-foreground">
			<div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
				<div className="grid gap-8 md:grid-cols-3">
					<div className="space-y-3">
						<ResponsiveLogo />
						<p className="max-w-xs text-sm text-muted-foreground">
							Order from your favourite vendors and get reliable, on-demand
							delivery — all in one place.
						</p>
					</div>

					<nav className="grid grid-cols-2 gap-6 text-sm md:col-span-2">
						<div>
							<h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Explore
							</h2>
							<ul className="space-y-2">
								<li>
									<Link
										to="/shop"
										className="text-foreground/80 hover:text-primary">
										Stores
									</Link>
								</li>
								<li>
									<Link
										to="/logistics"
										className="text-foreground/80 hover:text-primary">
										Logistics
									</Link>
								</li>
								<li>
									<Link
										to="/about"
										className="text-foreground/80 hover:text-primary">
										About
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-foreground/80 hover:text-primary">
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Legal
							</h2>
							<ul className="space-y-2">
								<li>
									<Link
										to="/privacy"
										className="text-foreground/80 hover:text-primary">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										to="/terms"
										className="text-foreground/80 hover:text-primary">
										Terms &amp; Conditions
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
					<p className="text-xs text-muted-foreground">
						© {year} Lifepadi™. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<a
							href="https://facebook.com/lifepadi"
							target="_blank"
							rel="noreferrer noopener"
							className="hover:text-primary">
							Facebook
						</a>
						<a
							href="https://twitter.com/lifepadi"
							target="_blank"
							rel="noreferrer noopener"
							className="hover:text-primary">
							Twitter
						</a>
						<a
							href="https://instagram.com/lifepadi"
							target="_blank"
							rel="noreferrer noopener"
							className="hover:text-primary">
							Instagram
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default ShopFooter;
