'use client';
import { useEffect } from 'react';

export const useShadowColor = () => {
	useEffect(() => {
		const updateShadowColor = () => {
			const mainColor = getComputedStyle(
				document.documentElement
			).getPropertyValue('--main-color');
			const rgbaColor = convertHexToRgba(mainColor.trim(), 0.5);
			document.documentElement.style.setProperty('--shadow-color', rgbaColor);
		};

		const convertHexToRgba = (hex: string, alpha: number) => {
			let r = 0,
				g = 0,
				b = 0;
			if (hex.length === 4) {
				r = parseInt(hex[1] + hex[1], 16);
				g = parseInt(hex[2] + hex[2], 16);
				b = parseInt(hex[3] + hex[3], 16);
			} else if (hex.length === 7) {
				r = parseInt(hex[1] + hex[2], 16);
				g = parseInt(hex[3] + hex[4], 16);
				b = parseInt(hex[5] + hex[6], 16);
			}
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		};

		updateShadowColor();
		window.addEventListener('colorchange', updateShadowColor);

		return () => window.removeEventListener('colorchange', updateShadowColor);
	}, []);
};
