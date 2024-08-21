'use client';
import { usePageTransition } from '@/hooks/use-page-transition';

export default function PageTransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { AnimatedWrapper } = usePageTransition();

	return (
		<AnimatedWrapper>
			<div className='relative w-full h-full flex justify-center items-center z-10'>
				{children}
			</div>
		</AnimatedWrapper>
	);
}
