import { cn } from '@/lib/utils';
import HyperText from '../magic-ui/hyper-text';
import { brutalismContainer } from '../ui/brutalism-container';
import { Separator } from '../ui/separator';

export const Marquee: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<div className='relative w-full overflow-hidden py-2 z-10'>
				
				<Separator />
				<div className='relative flex animate-marquee whitespace-nowrap'>
					{Array.isArray(children)
						? children.map((child, index) => (
								<div
									key={index}
									className='inline-block'
								>
									{child}
								</div>
							))
						: children}
					{Array.isArray(children)
						? children.map((child, index) => (
								<div
									key={index + children.length}
									className='inline-block'
								>
									{child}
								</div>
							))
						: children}
				</div>
				<Separator />
			</div>
		</>
	);
};
