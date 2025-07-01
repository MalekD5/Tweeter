import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				foreground: {
					DEFAULT: "#E7E9EA",
					muted: colors.zinc[700],
				},
				"twitter-blue": "#1D9BF0",
			},
			fontFamily: {
				"chirp-extended": ["ChirpExtended", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
