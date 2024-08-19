export const Marquee: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className='w-full overflow-hidden sm:mt-24 mt-10 z-10'>
			<div className='flex animate-marquee whitespace-nowrap'>
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
		</div>
	);
};
