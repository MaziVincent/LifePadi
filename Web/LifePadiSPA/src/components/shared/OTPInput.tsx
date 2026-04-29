import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
	length?: number;
	value: string[];
	onChange: (next: string[]) => void;
	disabled?: boolean;
	className?: string;
}

export const OTPInput = ({
	length = 4,
	value,
	onChange,
	disabled,
	className,
}: OTPInputProps) => {
	const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

	const handleChange = (raw: string, index: number) => {
		if (!/^[0-9]?$/.test(raw)) return;
		const next = [...value];
		next[index] = raw;
		onChange(next);
		if (raw && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && !value[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<div className={cn("flex justify-center gap-2", className)}>
			{Array.from({ length }).map((_, index) => (
				<input
					key={index}
					ref={(el) => (inputsRef.current[index] = el)}
					type="text"
					inputMode="numeric"
					maxLength={1}
					disabled={disabled}
					value={value[index] ?? ""}
					onChange={(e) => handleChange(e.target.value, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					className="h-12 w-10 rounded-lg border border-input bg-background text-center text-xl font-medium shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 sm:h-14 sm:w-12"
				/>
			))}
		</div>
	);
};
