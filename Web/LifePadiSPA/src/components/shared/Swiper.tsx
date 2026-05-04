import { useEffect, useRef, type ReactNode } from "react";
import { register } from "swiper/element/bundle";

interface SwiperProps {
	children?: ReactNode;
	[key: string]: unknown;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": any;
			"swiper-slide": any;
		}
	}
}

export function Swiper(props: SwiperProps) {
	const swiperRef = useRef<any>(null);
	const { children, ...rest } = props;

	useEffect(() => {
		register();
		const params = { ...rest };
		Object.assign(swiperRef.current, params);
		swiperRef.current.initialize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<swiper-container init="false" ref={swiperRef}>
			{children}
		</swiper-container>
	);
}

export function SwiperSlide(props: SwiperProps) {
	const { children, ...rest } = props;
	return <swiper-slide {...rest}>{children}</swiper-slide>;
}
