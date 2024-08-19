import React, {
	createContext,
	useContext,
	useRef,
	ReactNode,
	RefObject,
	useEffect,
} from 'react';

type ScrollContextType = {
	scrollContainerRef: RefObject<HTMLDivElement>;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
	const context = useContext(ScrollContext);
	if (!context) {
		throw new Error('useScrollContext must be used within a ScrollProvider');
	}
	return context;
};

export const ScrollProvider = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(
			'ScrollProvider: scrollContainerRef',
			scrollContainerRef.current
		);
	}, []);

	return (
		<ScrollContext.Provider value={{ scrollContainerRef }}>
			<div
				ref={scrollContainerRef}
				className={className}
			>
				{children}
			</div>
		</ScrollContext.Provider>
	);
};
