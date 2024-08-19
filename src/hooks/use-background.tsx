'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import ColorThief from 'color-thief-browser';

interface BackgroundContextProps {
	background: string;
	setBackground: (background: string) => void;
	useContrastingColor: boolean;
	setUseContrastingColor: (useContrastingColor: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(
	undefined
);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [background, setBackground] = useState('#cd93ff');
	const [useContrastingColor, setUseContrastingColor] = useState(false);

	useEffect(() => {
		if (background.length < 1) {
			setBackground('#cd93ff');
		}
	}, [background]);

	useEffect(() => {
		document.documentElement.style.setProperty('--main-color', background);
		document.querySelectorAll('.bg-main').forEach((el) => {
			(el as HTMLElement).style.background = background;
		});
		adjustTextColorBasedOnBg(background);
	}, [background, useContrastingColor]);

	const adjustTextColorBasedOnBg = (bgColor: string) => {
		let color = bgColor;
		if (bgColor.includes('linear-gradient')) {
			const match = /#([0-9a-f]{6}|[0-9a-f]{3})/i.exec(bgColor);
			color = match ? match[0] : '#000000';
			console.log('Gradient color:', color);
		} else if (bgColor.includes('url(')) {
			const img = new Image();
			img.crossOrigin = 'Anonymous';
			img.src = bgColor.slice(4, -1).replace(/"/g, '');

			img.onload = () => {
				const colorThief = new ColorThief();
				const dominantColor = colorThief.getColor(img);
				console.log('Dominant color from image:', dominantColor);

				// Calculate average color
				const palette = colorThief.getPalette(img, 5);
				const averageColor = palette
					.reduce(
						(acc, color) => {
							acc[0] += color[0];
							acc[1] += color[1];
							acc[2] += color[2];
							return acc;
						},
						[0, 0, 0]
					)
					.map((value) => Math.floor(value / palette.length));
				color = `rgb(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]})`;
				console.log('Average color from image:', color);

				const textColor = useContrastingColor
					? getContrastingColor(color)
					: getDefaultTextColor(color);
				console.log('Determined text color:', textColor);
				document.documentElement.style.setProperty(
					'--layoutText-color',
					textColor
				);
				document.documentElement.style.setProperty(
					'--text-shadow',
					'1px 1px 2px rgba(0,0,0,0.8)'
				);
			};
			return;
		} else {
			console.log('Solid color:', color);
		}

		const textColor = useContrastingColor
			? getContrastingColor(color.replace('linear-gradient', '').trim())
			: getDefaultTextColor(color.replace('linear-gradient', '').trim());
		console.log('Determined text color:', textColor);
		document.documentElement.style.setProperty('--layoutText-color', textColor);
		document.documentElement.style.setProperty(
			'--text-shadow',
			'1px 1px 2px rgba(0,0,0,0.8)'
		);
	};

	const getContrastingColor = (color: string) => {
		let r, g, b;

		if (color.startsWith('rgb')) {
			const rgbValues = color.match(/\d+/g);
			if (rgbValues) {
				r = parseInt(rgbValues[0], 10);
				g = parseInt(rgbValues[1], 10);
				b = parseInt(rgbValues[2], 10);
			} else {
				r = g = b = 0;
			}
		} else {
			color = color.replace('#', '');
			if (color.length === 3) {
				r = parseInt(color[0] + color[0], 16);
				g = parseInt(color[1] + color[1], 16);
				b = parseInt(color[2] + color[2], 16);
			} else {
				r = parseInt(color.slice(0, 2), 16);
				g = parseInt(color.slice(2, 4), 16);
				b = parseInt(color.slice(4, 6), 16);
			}
		}

		// Invert the color for contrast
		const invertedR = 255 - r;
		const invertedG = 255 - g;
		const invertedB = 255 - b;

		return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
	};

	const getDefaultTextColor = (color: string) => {
		let r, g, b;

		if (color.startsWith('rgb')) {
			const rgbValues = color.match(/\d+/g);
			if (rgbValues) {
				r = parseInt(rgbValues[0], 10);
				g = parseInt(rgbValues[1], 10);
				b = parseInt(rgbValues[2], 10);
			} else {
				r = g = b = 0;
			}
		} else {
			color = color.replace('#', '');
			if (color.length === 3) {
				r = parseInt(color[0] + color[0], 16);
				g = parseInt(color[1] + color[1], 16);
				b = parseInt(color[2] + color[2], 16);
			} else {
				r = parseInt(color.slice(0, 2), 16);
				g = parseInt(color.slice(2, 4), 16);
				b = parseInt(color.slice(4, 6), 16);
			}
		}

		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5 ? '#000000' : '#ffffff';
	};

	return (
		<BackgroundContext.Provider
			value={{
				background,
				setBackground,
				useContrastingColor,
				setUseContrastingColor,
			}}
		>
			{children}
		</BackgroundContext.Provider>
	);
};

export const useBackgroundContext = () => {
	const context = useContext(BackgroundContext);
	if (!context) {
		throw new Error(
			'useBackgroundContext must be used within a BackgroundProvider'
		);
	}
	return context;
};
