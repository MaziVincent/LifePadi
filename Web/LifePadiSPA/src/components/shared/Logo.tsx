import logo from "@/assets/images/Logonamedark.svg";

interface LogoProps {
	className?: string;
}

export function Logo({ className }: LogoProps) {
	return (
		<img src={logo} alt="LifePadi" className={className ?? "h-8 w-auto"} />
	);
}

export default Logo;
