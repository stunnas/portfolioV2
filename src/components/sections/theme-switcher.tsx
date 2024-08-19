'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	useEffect(() => {
		// Retrieve the saved theme preference from localStorage
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark') {
			setIsDarkMode(true);
			document.documentElement.classList.add('dark');
		} else {
			setIsDarkMode(false);
			document.documentElement.classList.remove('dark');
		}
	}, []);

	const handleToggle = () => {
		const newCheckedState = !isDarkMode;
		setIsDarkMode(newCheckedState);
		if (newCheckedState) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	return (
		<button
			className='w-full border-x-2 rounded-md border-neutral-800 bg-main hover:opacity-75'
			onClick={handleToggle}
		>
			<Sun
				className={`m500:h-4 m500:w-4 text-layoutText transition-colors duration-500 h-6 w-6 ${isDarkMode ? 'hidden' : 'inline'}`}
			/>
			<Moon
				className={`m500:h-4 m500:w-4 text-layoutText transition-colors duration-500 h-6 w-6 ${isDarkMode ? 'inline' : 'hidden'}`}
			/>
			<span className='sr-only'>Toggle theme</span>
		</button>
	);
}
