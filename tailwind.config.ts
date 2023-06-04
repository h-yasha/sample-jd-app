import typography from "@tailwindcss/typography";
import daisyUi from "daisyui";
import scrollbar from "tailwind-scrollbar";
import { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"fira-sans": ["Fira Sans", "sans-serif"],
			},
		},
	},
	plugins: [typography, scrollbar({ nocompatible: true }), daisyUi],
	daisyui: {
		themes: true,
	},
};

export default config;
