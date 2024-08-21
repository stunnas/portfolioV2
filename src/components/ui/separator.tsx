import { cn } from '@/lib/utils';

export const Separator = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn('w-full py-[0.1px] bg-black dark:bg-white', className)}
		/>
	);
};
