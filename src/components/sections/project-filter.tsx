import { Filter } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useBackgroundContext } from '@/hooks/use-background';

export function ProjectFilter({ className }: { className?: string }) {
	const { background } = useBackgroundContext();
	useEffect(() => {
		if (background.includes('gradient') || background.includes('url')) {
			document.documentElement.style.setProperty('--bg-main', background);
		} else {
			document.documentElement.style.setProperty('--main-color', background);
			document.documentElement.style.setProperty(
				'--bg-main',
				`var(--main-color)`
			);
		}
	}, [background]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn(`flex border-x-2 border-black px-2 bg-main`, className)}
				>
					<Filter className='text-layoutText transition-colors duration-500' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-64'>
				<Tabs
					defaultValue={'filters'}
					className='w-full'
				>
					<TabsList className='w-full mb-4'>
						<TabsTrigger
							className='flex-1'
							value='filters'
						>
							Filters
						</TabsTrigger>
						<TabsTrigger
							className='flex-1'
							value='sort'
						>
							Sort
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value='filters'
						className='flex flex-wrap gap-1 mt-0'
					></TabsContent>
					<TabsContent
						value='sort'
						className='flex flex-wrap gap-1 mt-0'
					></TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
}
