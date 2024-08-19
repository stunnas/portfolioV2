'use client';
import { useEffect, useState } from 'react';

export const useTheme = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const updateTheme = () => {
			const currentTheme = document.documentElement.classList.contains('dark')
				? 'dark'
				: 'light';
			setTheme(currentTheme);
		};

		updateTheme();

		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	return theme;
};
