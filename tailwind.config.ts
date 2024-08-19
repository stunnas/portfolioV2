// tailwind.config.ts
import type { Config } from 'tailwindcss';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

const addVariablesForColors = ({ addBase, theme }: any) => {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars,
	});
};

const config: Config = {
	darkMode: ['class'],
	content: [
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				main: 'var(--main-color)',
				layoutText: 'var(--layoutText-color)',
				mainAccent: '#9e66ff',
				overlay: 'rgba(0,0,0,0.8)',
				bg: '#e3dff2',
				border: '#000',
				darkBg: '#1D1F27',
				darkText: '#eeefe9',
				darkBorder: '#000',
			},
			borderRadius: {
				base: '5px',
			},
			boxShadow: {
				light: '4px 4px 0px 0px #000',
				dark: '4px 4px 0px 0px #000',
			},
			translate: {
				boxShadowX: '4px',
				boxShadowY: '4px',
				reverseBoxShadowX: '-4px',
				reverseBoxShadowY: '-4px',
			},
			fontWeight: {
				base: '500',
				heading: '700',
			},
			keyframes: {
				'shadow-move': {
					'0%, 100%': { boxShadow: '0 0 15px var(--shadow-color)' },
					'8.33%': { boxShadow: '7.5px -3.75px 15px var(--shadow-color)' },
					'16.67%': { boxShadow: '11.25px -1.875px 15px var(--shadow-color)' },
					'25%': { boxShadow: '15px 0 15px var(--shadow-color)' },
					'33.33%': { boxShadow: '11.25px 1.875px 15px var(--shadow-color)' },
					'41.67%': { boxShadow: '7.5px 3.75px 15px var(--shadow-color)' },
					'50%': { boxShadow: '0 7.5px 15px var(--shadow-color)' },
					'58.33%': { boxShadow: '-7.5px 3.75px 15px var(--shadow-color)' },
					'66.67%': { boxShadow: '-11.25px 1.875px 15px var(--shadow-color)' },
					'75%': { boxShadow: '-15px 0 15px var(--shadow-color)' },
					'83.33%': { boxShadow: '-11.25px -1.875px 15px var(--shadow-color)' },
					'91.67%': { boxShadow: '-7.5px -3.75px 15px var(--shadow-color)' },
				},
				'ripple': {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)',
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)',
					},
				},
				'gradient': {
					to: {
						backgroundPosition: 'var(--bg-size) 0',
					},
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animation: {
				'shadow-move': 'shadow-move 2s infinite',
				'ripple': 'ripple 3400ms ease infinite',
				'gradient': 'gradient 8s linear infinite',
				'marquee': 'marquee 30s linear infinite',
			},
		},
		screens: {
			smallHeight: { raw: '(max-height: 550px)' },
			w900: { max: '900px' },
			w800: { max: '800px' },
			w700: { max: '700px' },
			w600: { max: '600px' },
			w500: { max: '500px' },
			w450: { max: '450px' },
			w400: { max: '400px' },
		},
	},
	plugins: [require('tailwindcss-animate'), addVariablesForColors],
};

export default config;
