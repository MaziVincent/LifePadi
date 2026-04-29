import { motion } from "framer-motion";
import {
	Target,
	Heart,
	Trophy,
	Globe,
	AtSign,
	Sparkles,
	ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import background1 from "@/assets/images/background1.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/shared/FadeIn";
import MarqueeComp from "@/components/home/MarqueeComp";

const VALUES = [
	{
		icon: Target,
		title: "Our Mission",
		body: "Provide reliable, fast, and affordable delivery services across Nigeria. Every package, every meal, delivered on time, every time.",
	},
	{
		icon: Heart,
		title: "Our Values",
		body: "Excellence in service, integrity in operations, and relentless innovation. These guide everything we ship.",
	},
	{
		icon: Trophy,
		title: "Why Choose Us",
		body: "A vast vendor network, real-time tracking and a team obsessed with making your life easier.",
	},
];

const TEAM = [
	{
		name: "Ugwuagba Benard",
		role: "CEO / Co-founder",
		image:
			"https://res.cloudinary.com/dbxapeqzu/image/upload/v1746035534/LifePadi/others/WhatsApp_Image_2025-04-30_at_18.49.33_mddzwc.jpg",
	},
	{
		name: "Amobi Onwurah",
		role: "Co-founder / CFO",
		image:
			"https://res.cloudinary.com/dbxapeqzu/image/upload/v1746034363/LifePadi/others/amobi_lnhifh.jpg",
	},
	{
		name: "Ikechukwu Joshua",
		role: "Chief Operating Officer",
		image:
			"https://res.cloudinary.com/dbxapeqzu/image/upload/v1746034363/LifePadi/others/joshua_pehxvh.jpg",
	},
	{
		name: "Mazi Vincent",
		role: "Chief Technology Officer",
		image:
			"https://res.cloudinary.com/dbxapeqzu/image/upload/v1746034364/LifePadi/others/Mazi_uovxwn.png",
	},
];

const STATS = [
	{ value: "50K+", label: "Happy customers" },
	{ value: "1,200+", label: "Active vendors" },
	{ value: "30 min", label: "Avg. delivery" },
	{ value: "99.5%", label: "Order success" },
];

const About = () => {
	return (
		<main className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative overflow-hidden">
				<div
					className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 dark:opacity-15"
					style={{ backgroundImage: `url(${background1})` }}
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
				<div className="mx-auto max-w-5xl px-4 pb-20 pt-24 text-center lg:px-8 lg:pt-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<Badge
							variant="secondary"
							className="mb-6 gap-2 rounded-full px-4 py-1.5">
							<Sparkles className="h-3.5 w-3.5" />
							About LifePadi
						</Badge>
						<h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
							Simplifying everyday life,{" "}
							<span className="text-primary">one delivery at a time.</span>
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
							We make life easy by providing reliable, fast and affordable
							delivery and errand services — your padi for everything.
						</p>
						<div className="mt-8 flex flex-wrap justify-center gap-3">
							<Button asChild size="lg" className="gap-2">
								<Link to="/shop">
									Explore the store <ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link to="/contact">Get in touch</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* STATS */}
			<section className="border-y bg-card/40">
				<div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-12 md:grid-cols-4 lg:px-8">
					{STATS.map((s, i) => (
						<FadeIn key={s.label} delay={i * 0.08} className="text-center">
							<div className="text-3xl font-bold text-primary sm:text-4xl">
								{s.value}
							</div>
							<div className="mt-1 text-sm text-muted-foreground">
								{s.label}
							</div>
						</FadeIn>
					))}
				</div>
			</section>

			{/* VALUES */}
			<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
				<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
					<Badge variant="outline" className="mb-3 rounded-full">
						What we stand for
					</Badge>
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						We are <span className="text-primary">your padi</span>
					</h2>
					<p className="mt-4 text-muted-foreground">
						Delivering excellence across the nation.
					</p>
				</FadeIn>

				<div className="grid gap-6 md:grid-cols-3">
					{VALUES.map((v, i) => (
						<FadeIn key={v.title} delay={i * 0.12}>
							<Card className="h-full border-border/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
								<CardContent className="flex h-full flex-col items-center p-8 text-center">
									<div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
										<v.icon className="h-7 w-7" />
									</div>
									<h3 className="text-xl font-semibold">{v.title}</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{v.body}
									</p>
								</CardContent>
							</Card>
						</FadeIn>
					))}
				</div>
			</section>

			{/* TEAM */}
			<section className="border-y bg-card/40">
				<div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
					<FadeIn className="mx-auto mb-12 max-w-2xl text-center">
						<Badge variant="outline" className="mb-3 rounded-full">
							Our team
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							The padis behind LifePadi
						</h2>
						<p className="mt-4 text-muted-foreground">
							A dedicated team revolutionising delivery services with precision
							and care.
						</p>
					</FadeIn>

					<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
						{TEAM.map((m, i) => (
							<FadeIn key={m.name} delay={i * 0.08}>
								<Card className="overflow-hidden border-border/60 text-center transition hover:border-primary/50 hover:shadow-lg">
									<div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/5 p-6">
										<img
											src={m.image}
											alt={m.name}
											className="h-full w-full rounded-full object-cover ring-4 ring-background"
											loading="lazy"
										/>
									</div>
									<CardContent className="p-5">
										<h3 className="text-base font-semibold">{m.name}</h3>
										<p className="mt-1 text-xs text-muted-foreground">
											{m.role}
										</p>
										<div className="mt-3 flex justify-center gap-2 text-muted-foreground">
											<a
												href="#"
												aria-label={`${m.name} on the web`}
												className="rounded-full p-1.5 transition hover:bg-primary/10 hover:text-primary">
												<Globe className="h-4 w-4" />
											</a>
											<a
												href="#"
												aria-label={`Email ${m.name}`}
												className="rounded-full p-1.5 transition hover:bg-primary/10 hover:text-primary">
												<AtSign className="h-4 w-4" />
											</a>
										</div>
									</CardContent>
								</Card>
							</FadeIn>
						))}
					</div>
				</div>
			</section>

			{/* CORE VALUES MARQUEE */}
			<section className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
				<FadeIn>
					<h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
						Our Core Values
					</h2>
				</FadeIn>
			</section>
			<section className="bg-primary py-12 text-primary-foreground">
				<MarqueeComp />
			</section>
		</main>
	);
};

export default About;
