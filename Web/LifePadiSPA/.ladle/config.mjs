/** @type {import('@ladle/react').UserConfig} */
export default {
	stories: "src/**/*.stories.{ts,tsx}",
	outDir: "ladle-dist",
	addons: {
		theme: {
			enabled: true,
			defaultState: "light",
		},
	},
};
