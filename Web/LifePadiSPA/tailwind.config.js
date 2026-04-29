/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				brand: {
					DEFAULT: "hsl(var(--brand))",
					foreground: "hsl(var(--brand-foreground))",
				},
				text: "#393737",
				grayTxt: "#3d3b3b",
				gray: "#9ca3af",
				inherit: "inherit",
				red: "#ff0000",
				graybg: "#e5e7eb",
				redborder: "#ff8282",
				lightgreen: "#8eca8e",
				lightyellow: "#F7DC6F",
				lightcyan: "#00FFFF",
				lightemerald: "#00FF00",
				lightindigo: "#4B0082",
				lightorange: "#FFA07A",
				lightviolet: "#EE00FF",
				lightteal: "#00FF80",
				lightForest: "#E9F5DB",
				darkBg: "#181818",
				darkMenu: "#212121",
				darkHover: "#3D3D3D",
				darkSecondaryText: "#AAAAAA",
				yellow: "#e8c115",
				blue: "#15c5e8",
				lightGray: "#f1f2f3",
				midnightGreen: "#073B4C",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }) {
			addUtilities({
				".scrollbar-hide": {
					"scrollbar-width": "none",
					"&::-webkit-scrollbar": {
						display: "none",
					},
				},
			});
		},
	],
};
