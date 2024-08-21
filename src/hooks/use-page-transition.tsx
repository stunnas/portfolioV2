'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const layoutVariants = {
	hidden: { opacity: 0, y: 50, scale: 0.25 },
	visible: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 50, scale: 0.25 },
};

export function usePageTransition() {
	const pathname = usePathname();
	const [animationKey, setAnimationKey] = useState(pathname);

	useEffect(() => {
		setAnimationKey(pathname);
	}, [pathname]);

	const AnimatedWrapper = ({ children }: { children: React.ReactNode }) => (
		<AnimatePresence mode='wait'>
			<motion.div
				key={animationKey} // Use controlled key for stable rendering
				initial='hidden'
				animate='visible'
				exit='exit'
				variants={layoutVariants}
				transition={{ duration: 1.5, ease: 'easeOut' }}
				className='relative w-full h-full flex justify-center items-center z-10'
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);

	return { AnimatedWrapper };
}
