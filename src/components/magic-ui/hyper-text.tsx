'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { brutalismContainer } from '../ui/brutalism-container';

interface HyperTextProps {
	text: string;
	duration?: number;
	framerProps?: Variants;
	className?: string;
	animateOnLoad?: boolean;
}

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
	text,
	duration = 800,
	framerProps = {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 3 },
	},
	className,
	animateOnLoad = true,
}: HyperTextProps) {
	const [displayText, setDisplayText] = useState(text.split(''));
	const [trigger, setTrigger] = useState(false);
	const iterations = useRef(0);
	const isFirstRender = useRef(true);

	const triggerAnimation = () => {
		iterations.current = 0;
		setTrigger(true);
	};

	useEffect(() => {
		const interval = setInterval(
			() => {
				if (!animateOnLoad && isFirstRender.current) {
					clearInterval(interval);
					isFirstRender.current = false;
					return;
				}
				if (iterations.current < text.length) {
					setDisplayText((t) =>
						t.map((l, i) =>
							l === ' '
								? ' ' // Preserve space as is
								: i <= iterations.current
									? text[i]
									: alphabets[getRandomInt(26)]
						)
					);
					iterations.current = iterations.current + 0.1;
				} else {
					setTrigger(false);
					clearInterval(interval);
				}
			},
			duration / (text.length * 10)
		);

		return () => clearInterval(interval);
	}, [text, duration, trigger, animateOnLoad]);

	return (
		<div
			className={cn(
				'overflow-hidden py-2 flex cursor-default scale-100 w500:text-base text-2xl',
				brutalismContainer
			)}
			onMouseEnter={triggerAnimation}
		>
			<AnimatePresence>
				{displayText.map((letter, i) => (
					<motion.h1
						key={i}
						className={cn('font-mono', className)}
						{...framerProps}
					>
						{letter === ' ' ? '\u00A0' : letter}
						{/* Render non-breaking space */}
					</motion.h1>
				))}
			</AnimatePresence>
		</div>
	);
}
