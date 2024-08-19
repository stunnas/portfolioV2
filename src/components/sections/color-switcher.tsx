'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { GradientPicker } from '@/components/color-ui/gradient-picker';
import { useBackgroundContext } from '@/hooks/use-background';

export function ColorSwitcher() {
	const { background, setBackground } = useBackgroundContext();

	useEffect(() => {
		if (background) {
			document.documentElement.style.setProperty('--main-color', background);
			// Apply the background to all elements with the 'bg-main' class
			document.querySelectorAll('.bg-main').forEach((el) => {
				(el as HTMLElement).style.background = background;
			});
			setBackground(background);
		}
	}, [background, setBackground]);

	return (
		<div className='w-full rounded-md border-neutral-800 hover:opacity-75'>
			<GradientPicker className='w-full h-full' />
			<span className='sr-only'>Toggle color</span>
		</div>
	);
}
