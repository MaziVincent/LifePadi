import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import Marquee from "react-fast-marquee";
import {
	Store,
	Bike,
	Users,
	ArrowRight,
	Sparkles,
	Clock,
	ShieldCheck,
	MapPin,
	Star,
	Quote,
} from "lucide-react";

import HeroAnimation from "@/assets/lottie/Heroanimation4.json";
import iphone from "@/assets/images/LifepadiPhone.png";
import vendor2 from "@/assets/images/vendor2.png";
import rider from "@/assets/images/rider.png";
import delivery from "@/assets/images/delivery.png";
import burger from "@/assets/images/burger.png";
import deliveryman from "@/assets/images/deliveryman.png";
import grocerybags from "@/assets/images/grocerybags.png";
import buyingfood from "@/assets/images/Buying food.png";
import sparlogo from "@/assets/images/sparlogo.jpeg";
import roban from "@/assets/images/roban.png";
import shoprite from "@/assets/images/shoprite.png";
import dominospizza from "@/assets/images/dominospizza.png";
import kilimanjaro from "@/assets/images/Kilimanjaro.jpg";
import ntachi from "@/assets/images/ntachi.png";
import AppStore from "@/assets/images/app-store-white.svg";
import PlayStore from "@/assets/images/app-store-black.svg";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/shared/FadeIn";

const ROTATING_WORDS = ["Food", "Groceries", "Logistics", "Errands"] as const;

const HIGHLIGHTS = [
	{ icon: Clock, label: "Avg. delivery in 30 mins" },
	{ icon: ShieldCheck, label: "Trusted by 50,000+ customers" },
	{ icon: MapPin, label: "Serving Enugu, Lagos & beyond" },
];

const ROLE_CARDS = [
	{
		title: "Are you a Vendor?",
		description:
			"Grow your business with the LifePadi network. Get instant access to thousands of customers, real-time insights, and same-day payouts.",
		image: vendor2,
		icon: Store,
		cta: "Become a vendor",
		to: "/vendor-register",
	},
	{
		title: "Become a Padi",
		description:
			"Earn flexibly on your schedule. Drive deliveries when you want, where you want — keep more of every order.",
		image: rider,
		icon: Bike,
		cta: "Ride with us",
		to: "/rider-register",
	},
	{
		title: "Build with us",
		description:
			"We are hiring engineers, designers and ops people who care about making everyday life easier across Africa.",
		image: delivery,
		icon: Users,
		cta: "Join the team",
		to: "/contact",
	},
] as const;

const VENDORS = [
	{ text: "Ntachi-Osa Restaurant", src: ntachi },
	{ text: "Shoprite", src: shoprite },
	{ text: "Roban Stores", src: roban },
	{ text: "Spar Supermarket", src: sparlogo },
	{ text: "Domino's Pizza", src: dominospizza },
	{ text: "Kilimanjaro", src: kilimanjaro },
];

const SERVICES = [
	{
		title: "Restaurants",
		copy: "From local jollof to international cuisine — hot meals, delivered fast.",
		image: burger,
	},
	{
		title: "Logistics",
		copy: "Send and receive packages across town with live driver tracking.",
		image: deliveryman,
	},
	{
		title: "Groceries & Errands",
		copy: "Skip the queue. We pick up your shopping list and bring it to your door.",
		image: grocerybags,
	},
];

const TESTIMONIALS = [
	{
		quote:
			"LifePadi has saved my evenings. I order dinner on my way home and it arrives before I do.",
		name: "Adaeze N.",
		role: "Customer · Enugu",
	},
	{
		quote:
			"Sales went up 40% in our first quarter on the platform. The dashboard is incredibly easy.",
		name: "Chinedu O.",
		role: "Vendor · Spar GRA",
	},
	{
		quote:
			"Riding with LifePadi gives me real flexibility. Payments hit my account same-day, every day.",
		name: "Tunde A.",
		role: "Rider · Lagos",
	},
];

const Home = () => {
	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		const t = setInterval(
			() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
			2800,
		);
		return () => clearInterval(t);
	}, []);

	return (
		<main className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/10 dark:from-primary/10 dark:via-background dark:to-accent/5" />
				<div
					aria-hidden
					className="absolute -top-32 left-1/2 -translate-x-1/2 h-[640px] w-[640px] rounded-full bg-primary/30 blur-3xl dark:bg-primary/15"
				/>

				<div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-32 lg:pt-24">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						className="flex flex-col justify-center">
						<Badge
							variant="secondary"
							className="mb-6 w-fit gap-2 rounded-full px-4 py-1.5 text-sm">
							<Sparkles className="h-3.5 w-3.5" />
							Now live across Nigeria
						</Badge>

						<h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
							Padi for{" "}
							<span className="relative inline-block min-w-[5ch] text-primary">
								<AnimatePresence mode="wait">
									<motion.span
										key={ROTATING_WORDS[wordIndex]}
										initial={{ y: 30, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -30, opacity: 0 }}
										transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
										className="inline-block">
										{ROTATING_WORDS[wordIndex]}
									</motion.span>
								</AnimatePresence>
							</span>
							<br />
							delivered to your door.
						</h1>

						<p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
							Order food, groceries, gas and packages from one place. Track your
							padi (rider) in real time and get back to what matters.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Button asChild size="lg" className="gap-2">
								<Link to="/shop">
									Explore the store <ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link to="/logistics">Send a package</Link>
							</Button>
						</div>

						<div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
							<span className="text-muted-foreground">Join the network:</span>
							<Link
								to="/vendor-register"
								className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
								<Store className="h-4 w-4" /> Become a Vendor
							</Link>
							<Link
								to="/rider-register"
								className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
								<Bike className="h-4 w-4" /> Become a Rider
							</Link>
						</div>

						<dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
							{HIGHLIGHTS.map((h) => (
								<div
									key={h.label}
									className="flex items-center gap-2 text-sm text-muted-foreground">
									<h.icon className="h-4 w-4 text-primary" />
									<span>{h.label}</span>
								</div>
							))}
						</dl>
					</motion.div>

					<FadeIn direction="left" delay={0.2} className="flex items-center">
						<div className="relative aspect-square w-full max-w-xl">
							<Lottie
								animationData={HeroAnimation}
								loop
								autoplay
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
					</FadeIn>
				</div>

				{/* Trusted-by marquee */}
				<div className="relative border-y bg-card/50 py-6 backdrop-blur">
					<p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Trusted by leading vendors
					</p>
					<Marquee gradient={false} speed={40} pauseOnHover>
						{[...VENDORS, ...VENDORS].map((v, i) => (
							<div
								key={`${v.text}-${i}`}
								className="mx-10 flex items-center gap-3 opacity-70 transition hover:opacity-100">
								<img
									src={v.src}
									alt={v.text}
									className="h-10 w-10 rounded-full object-cover"
									loading="lazy"
								/>
								<span className="text-sm font-medium text-foreground/80">
									{v.text}
								</span>
							</div>
						))}
					</Marquee>
				</div>
			</section>

			{/* SERVICES */}
			<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
				<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
					<Badge variant="outline" className="mb-3 rounded-full">
						Our services
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						We deliver <span className="text-primary">everything you need</span>
					</h2>
					<p className="mt-4 text-muted-foreground">
						One app for the moments that make up your day.
					</p>
				</FadeIn>

				<div className="grid gap-6 md:grid-cols-3">
					{SERVICES.map((s, i) => (
						<FadeIn key={s.title} delay={i * 0.1}>
							<Card className="group h-full overflow-hidden border-border/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
								<div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5">
									<img
										src={s.image}
										alt={s.title}
										className="h-32 w-32 object-contain transition-transform group-hover:scale-110"
										loading="lazy"
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold">{s.title}</h3>
									<p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>
			</section>

			{/* ROLE CARDS */}
			<section className="border-y bg-card/40">
				<div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
					<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
						<Badge variant="outline" className="mb-3 rounded-full">
							Join the LifePadi network
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							There's a padi for everything you do
						</h2>
					</FadeIn>

					<div className="grid gap-6 md:grid-cols-3">
						{ROLE_CARDS.map((r, i) => (
							<FadeIn key={r.title} delay={i * 0.12}>
								<Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-background/80 transition hover:border-primary/50 hover:shadow-xl">
									<div className="flex h-40 items-center justify-center bg-primary/5">
										<img
											src={r.image}
											alt={r.title}
											className="h-32 object-contain transition group-hover:scale-105"
											loading="lazy"
										/>
									</div>
									<CardContent className="flex flex-1 flex-col p-6">
										<div className="mb-3 flex items-center gap-2">
											<span className="rounded-md bg-primary/10 p-1.5 text-primary">
												<r.icon className="h-4 w-4" />
											</span>
											<h3 className="text-lg font-semibold">{r.title}</h3>
										</div>
										<p className="flex-1 text-sm text-muted-foreground">
											{r.description}
										</p>
										<Button
											asChild
											variant="ghost"
											className="mt-4 w-fit -translate-x-3 gap-1 px-3 text-primary hover:bg-primary/10">
											<Link to={r.to}>
												{r.cta} <ArrowRight className="h-4 w-4" />
											</Link>
										</Button>
									</CardContent>
								</Card>
							</FadeIn>
						))}
					</div>
				</div>
			</section>

			{/* TESTIMONIALS */}
			<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
				<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
					<Badge variant="outline" className="mb-3 rounded-full">
						Loved by our community
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Padis, riders & vendors love LifePadi
					</h2>
				</FadeIn>

				<div className="grid gap-6 md:grid-cols-3">
					{TESTIMONIALS.map((t, i) => (
						<FadeIn key={t.name} delay={i * 0.12}>
							<Card className="h-full border-border/60">
								<CardContent className="flex h-full flex-col p-6">
									<Quote className="h-8 w-8 text-primary/40" />
									<p className="mt-3 flex-1 text-sm leading-relaxed">
										"{t.quote}"
									</p>
									<div className="mt-6 flex items-center justify-between">
										<div>
											<p className="font-medium">{t.name}</p>
											<p className="text-xs text-muted-foreground">{t.role}</p>
										</div>
										<div className="flex gap-0.5">
											{Array.from({ length: 5 }).map((_, j) => (
												<Star
													key={j}
													className="h-3.5 w-3.5 fill-primary text-primary"
												/>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>
			</section>

			{/* FINAL CTA */}
			<section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
				<div
					aria-hidden
					className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:24px_24px]"
				/>
				<div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
					<FadeIn>
						<h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
							Place your order in seconds.
						</h2>
						<p className="mt-4 max-w-lg text-base text-primary-foreground/80">
							Download the LifePadi app and have your favourites delivered the
							moment you want them.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<a
								href="https://apps.apple.com/us/app/lifepadi/id6741829265"
								className="rounded-xl bg-background/95 px-3 py-2 transition hover:bg-background">
								<img
									src={AppStore}
									alt="App Store"
									className="h-10 w-40 object-contain"
								/>
							</a>
							<a
								href="https://play.google.com/store/apps/details?id=com.lifepadi.app"
								className="rounded-xl bg-background/95 px-3 py-2 transition hover:bg-background">
								<img
									src={PlayStore}
									alt="Play Store"
									className="h-10 w-40 object-contain"
								/>
							</a>
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="bg-background text-foreground hover:bg-background/90">
								<Link to="/shop">Open the web store</Link>
							</Button>
						</div>
					</FadeIn>

					<FadeIn direction="left" delay={0.2} className="flex justify-center">
						<div className="relative">
							<img
								src={iphone}
								alt="LifePadi mobile app"
								className="relative z-10 h-[420px] object-contain drop-shadow-2xl"
								loading="lazy"
							/>
							<img
								src={buyingfood}
								alt=""
								aria-hidden
								className="absolute -bottom-4 -left-12 hidden w-48 rotate-[-8deg] rounded-2xl border border-white/30 shadow-xl md:block"
								loading="lazy"
							/>
						</div>
					</FadeIn>
				</div>
			</section>
		</main>
	);
};

export default Home;
