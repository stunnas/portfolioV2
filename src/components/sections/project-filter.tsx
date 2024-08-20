import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useBackgroundContext } from '@/hooks/use-background';
import { useProjectFilter } from '@/lib/context/project-filter-context';

export function ProjectFilter({
	className,
	onSortChange,
	onFilterChange,
}: {
	className?: string;
	onSortChange: (sortBy: string) => void;
	onFilterChange: (filters: { types: string[]; teamSizes: string[] }) => void;
}) {
	const { background, setBackground } = useBackgroundContext();
	const { totalProjects } = useProjectFilter();

	// Default filter options
	const allTypes = ['landing page', 'tool', 'game'];
	const allTeamSizes = ['solo', '2-5 members', '6+ members'];

	// State to track selected filters and sort
	const [selectedTypes, setSelectedTypes] = useState<string[]>(allTypes);
	const [selectedTeamSizes, setSelectedTeamSizes] =
		useState<string[]>(allTeamSizes);
	const [selectedSort, setSelectedSort] = useState<string>('date-added-newest');

	// Notify parent of filter and sort changes when state changes
	useEffect(() => {
		onFilterChange({ types: selectedTypes, teamSizes: selectedTeamSizes });
	}, [selectedTypes, selectedTeamSizes, onFilterChange]);

	useEffect(() => {
		onSortChange(selectedSort);
	}, [selectedSort, onSortChange]);

	// Handle checkbox changes
	const handleCheckboxChange = (
		filterType: 'types' | 'teamSizes',
		value: string
	) => {
		if (filterType === 'types') {
			setSelectedTypes((prev) =>
				prev.includes(value)
					? prev.filter((t) => t !== value)
					: [...prev, value]
			);
		} else {
			setSelectedTeamSizes((prev) =>
				prev.includes(value)
					? prev.filter((s) => s !== value)
					: [...prev, value]
			);
		}
	};

	useEffect(() => {
		if (
			JSON.stringify(selectedTypes) !== JSON.stringify(allTypes) ||
			JSON.stringify(selectedTeamSizes) !== JSON.stringify(allTeamSizes)
		) {
			onFilterChange({ types: selectedTypes, teamSizes: selectedTeamSizes });
		}
	}, [selectedTypes, selectedTeamSizes, onFilterChange]);

	// Apply background color
	useEffect(() => {
		if (background) {
			document.documentElement.style.setProperty('--main-color', background);
			document.querySelectorAll('.bg-main').forEach((el) => {
				(el as HTMLElement).style.background = background;
			});
			setBackground(background);
		}
	}, [background, setBackground]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn(
						`flex border-x-2 border-black px-2 bg-main hover:opacity-75`,
						className
					)}
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

					{/* Filters */}
					<TabsContent
						value='filters'
						className='flex flex-col gap-2'
					>
						<div className='flex flex-col gap-2'>
							<h4 className='text-red-500'>Total Shown: {totalProjects}</h4>
							<h4 className='font-bold'>Project Type</h4>
							{allTypes.map((type) => (
								<div key={type}>
									<label
										htmlFor={type}
										className='flex items-center gap-2'
									>
										<Checkbox
											id={type}
											checked={selectedTypes.includes(type)}
											onCheckedChange={() =>
												handleCheckboxChange('types', type)
											}
										/>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</label>
								</div>
							))}
						</div>

						<div className='flex flex-col gap-2 mt-4'>
							<h4 className='font-bold'>Team Size</h4>
							{allTeamSizes.map((size) => (
								<div key={size}>
									<label
										htmlFor={size}
										className='flex items-center gap-2'
									>
										<Checkbox
											id={size}
											checked={selectedTeamSizes.includes(size)}
											onCheckedChange={() =>
												handleCheckboxChange('teamSizes', size)
											}
										/>
										{size.charAt(0).toUpperCase() + size.slice(1)}
									</label>
								</div>
							))}
						</div>
					</TabsContent>

					{/* Sort */}
					<TabsContent
						value='sort'
						className='flex flex-col gap-2'
					>
						<h4 className='font-bold mb-2'>Sort By</h4>
						<Select
							value={selectedSort}
							onValueChange={(value) => setSelectedSort(value)}
						>
							<SelectTrigger>
								<span>
									{selectedSort === 'date-added-newest' &&
										'Date Created (Newest)'}
									{selectedSort === 'date-added-oldest' &&
										'Date Created (Oldest)'}
									{selectedSort === 'alphabetical-a-z' && 'Alphabetical (A-Z)'}
									{selectedSort === 'alphabetical-z-a' && 'Alphabetical (Z-A)'}
									{selectedSort === 'random' && 'Random'}
								</span>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='date-added-newest'>
									Date Created (Newest)
								</SelectItem>
								<SelectItem value='date-added-oldest'>
									Date Created (Oldest)
								</SelectItem>
								<SelectItem value='alphabetical-a-z'>
									Alphabetical (A-Z)
								</SelectItem>
								<SelectItem value='alphabetical-z-a'>
									Alphabetical (Z-A)
								</SelectItem>
								<SelectItem value='random'>Random</SelectItem>
							</SelectContent>
						</Select>
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
}
