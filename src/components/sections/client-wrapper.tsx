'use client';
import { ReactNode } from 'react';
import { ScrollProvider } from '@/hooks/use-scroll';

export default function ClientWrapper({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <ScrollProvider className={className}>{children}</ScrollProvider>;
}
