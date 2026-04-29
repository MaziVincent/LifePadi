import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
	children: ReactNode;
	delay?: number;
	direction?: Direction;
	className?: string;
	once?: boolean;
}

/**
 * Reveals children with a soft fade + directional slide as they
 * scroll into view. Uses framer-motion's `useInView`.
 */
export function FadeIn({
	children,
	delay = 0,
	direction = "up",
	className,
	once = true,
}: FadeInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once, margin: "-80px" });
	const controls = useAnimation();

	useEffect(() => {
		if (inView) controls.start("visible");
		else if (!once) controls.start("hidden");
	}, [inView, controls, once]);

	const offsets: Record<Direction, { x: number; y: number }> = {
		up: { x: 0, y: 40 },
		down: { x: 0, y: -40 },
		left: { x: 40, y: 0 },
		right: { x: -40, y: 0 },
	};
	const { x, y } = offsets[direction];

	return (
		<motion.div
			ref={ref}
			variants={{
				hidden: { opacity: 0, x, y },
				visible: { opacity: 1, x: 0, y: 0 },
			}}
			initial="hidden"
			animate={controls}
			transition={{
				duration: 0.7,
				delay,
				ease: [0.22, 1, 0.36, 1],
			}}
			className={className}>
			{children}
		</motion.div>
	);
}

export default FadeIn;
