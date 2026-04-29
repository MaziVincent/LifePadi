import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Package,
	HandCoins,
	Truck,
	MapPinned,
	Smile,
	Sparkles,
	ArrowRight,
	ShieldCheck,
	Clock,
	Zap,
} from "lucide-react";

import background1 from "@/assets/images/background1.webp";
import delivery1 from "@/assets/images/_2d580ecb-fb18-4132-91e7-6e2be260dfdc.jpeg";
import deliveryMan from "@/assets/images/deliveryMan.webp";
import dropOff from "@/assets/images/dropOff.webp";
import insurePackage from "@/assets/images/insurePackage.webp";
import packageHandOver from "@/assets/images/packageHandOver.webp";
import pickUp from "@/assets/images/pickUp.webp";
import AppStore from "@/assets/images/app-store-white.svg";
import PlayStore from "@/assets/images/app-store-black.svg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/shared/FadeIn";

const STEPS = [
	{
		icon: Package,
		title: "Get your package ready",
		body: "Pack it up safely — small or big, we handle it all.",
		image: insurePackage,
	},
	{
		icon: HandCoins,
		title: "Hand it to your padi",
		body: "Your assigned rider arrives at your pickup location promptly.",
		image: packageHandOver,
	},
	{
		icon: Truck,
		title: "We hit the road",
		body: "Track your padi live, end-to-end, every mile of the way.",
		image: dropOff,
	},
	{
		icon: MapPinned,
		title: "Delivered safely",
		body: "Real-time confirmation when your package arrives at its destination.",
		image: deliveryMan,
	},
	{
		icon: Smile,
		title: "Smiles all around",
		body: "Quick, safe, hassle-free — that's the LifePadi promise.",
		image: pickUp,
	},
];

const PERKS = [
	{
		icon: Zap,
		title: "Same-day delivery",
		body: "Most local deliveries complete within 30–60 minutes.",
	},
	{
		icon: ShieldCheck,
		title: "Insured packages",
		body: "Optional cover protects valuable items end-to-end.",
	},
	{
		icon: Clock,
		title: "Live tracking",
		body: "Watch your padi's location in real time inside the app.",
	},
];

const Logistics = () => {
	return (
		<main className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative overflow-hidden">
				<div
					className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 dark:opacity-15"
					style={{ backgroundImage: `url(${background1})` }}
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
				<div
					aria-hidden
					className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10"
				/>

				<div className="mx-auto max-w-5xl px-4 pb-20 pt-24 text-center lg:px-8 lg:pt-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<Badge
							variant="secondary"
							className="mb-6 gap-2 rounded-full px-4 py-1.5">
							<Sparkles className="h-3.5 w-3.5" />
							LifePadi Logistics
						</Badge>
						<h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
							Send & receive packages,{" "}
							<span className="text-primary">the easy way.</span>
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
							From documents to bulky parcels — your padi is one tap away. Track
							in real time, pay in-app, smile.
						</p>
						<div className="mt-8 flex flex-wrap justify-center gap-3">
							<Button asChild size="lg" className="gap-2">
								<Link to="/shop/logistics">
									Use LifePadi Logistics <ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<a href="https://play.google.com/store/apps/details?id=com.lifepadi.app">
								<img src={PlayStore} alt="Play Store" className="h-12" />
							</a>
							<a href="https://apps.apple.com/us/app/lifepadi/id6741829265">
								<img src={AppStore} alt="App Store" className="h-12" />
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			{/* PERKS */}
			<section className="border-y bg-card/40">
				<div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3 lg:px-8">
					{PERKS.map((p, i) => (
						<FadeIn key={p.title} delay={i * 0.1}>
							<div className="flex items-start gap-4">
								<span className="rounded-xl bg-primary/10 p-3 text-primary">
									<p.icon className="h-5 w-5" />
								</span>
								<div>
									<h3 className="font-semibold">{p.title}</h3>
									<p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
				<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
					<Badge variant="outline" className="mb-3 rounded-full">
						How it works
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
						Five simple steps to{" "}
						<span className="text-primary">hassle-free delivery</span>
					</h2>
				</FadeIn>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{STEPS.map((s, i) => (
						<FadeIn key={s.title} delay={i * 0.1}>
							<Card className="group h-full overflow-hidden border-border/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
								<div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5">
									<img
										src={s.image}
										alt={s.title}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg">
										{i + 1}
									</div>
								</div>
								<CardContent className="p-6">
									<div className="mb-2 flex items-center gap-2 text-primary">
										<s.icon className="h-5 w-5" />
										<h3 className="text-lg font-semibold text-foreground">
											{s.title}
										</h3>
									</div>
									<p className="text-sm text-muted-foreground">{s.body}</p>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>
			</section>

			{/* IMAGE BANNER */}
			<section className="border-y bg-card/40">
				<div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
					<FadeIn className="mx-auto mb-10 max-w-3xl text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
							You need it? <span className="text-primary">We'll bring it.</span>
						</h2>
						<p className="mt-4 text-muted-foreground">
							Say goodbye to harrowing deliveries and hello to quick, easy ones.
						</p>
					</FadeIn>
					<FadeIn className="mx-auto max-w-4xl">
						<div className="overflow-hidden rounded-3xl border shadow-xl">
							<img
								src={delivery1}
								alt="LifePadi delivery"
								className="w-full object-cover"
								loading="lazy"
							/>
						</div>
					</FadeIn>
				</div>
			</section>

			{/* FINAL CTA */}
			<section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
				<div
					aria-hidden
					className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]"
				/>
				<div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-5 lg:items-center lg:px-8 lg:py-28">
					<FadeIn className="lg:col-span-3">
						<h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
							Send and Receive,{" "}
							<span className="underline decoration-primary-foreground/30 underline-offset-4">
								swiftly.
							</span>
						</h2>
						<p className="mt-4 max-w-lg text-base text-primary-foreground/85">
							Book a delivery from the LifePadi app or directly from the web —
							your padi will be on the way in minutes.
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-3">
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="bg-background text-foreground hover:bg-background/90">
								<Link to="/shop/logistics" className="gap-2">
									Use LifePadi Logistics
								</Link>
							</Button>
							<a
								href="https://play.google.com/store/apps/details?id=com.lifepadi.app"
								className="rounded-xl bg-background/95 px-3 py-2 transition hover:bg-background">
								<img
									src={PlayStore}
									alt="Play Store"
									className="h-10 w-40 object-contain"
								/>
							</a>
							<a
								href="https://apps.apple.com/us/app/lifepadi/id6741829265"
								className="rounded-xl bg-background/95 px-3 py-2 transition hover:bg-background">
								<img
									src={AppStore}
									alt="App Store"
									className="h-10 w-40 object-contain"
								/>
							</a>
						</div>
					</FadeIn>
					<FadeIn direction="left" delay={0.2} className="lg:col-span-2">
						<div className="overflow-hidden rounded-3xl border-4 border-background/20 shadow-2xl">
							<img
								src={pickUp}
								alt=""
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</FadeIn>
				</div>
			</section>
		</main>
	);
};

export default Logistics;
