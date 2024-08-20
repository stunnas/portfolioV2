'use client';

import { useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './theme-switcher';
import { ColorSwitcher } from './color-switcher';
import { Home, FileAxis3d } from 'lucide-react';
import { ProjectFilter } from './project-filter';
import { useProjectFilter } from '@/lib/context/project-filter-context';

export default function Nav() {
	const path = usePathname();
	const isPortfolioLink = path === '/portfolio';
	const { setSortOrder, setFilters } = useProjectFilter();

	useEffect(() => {
		const updateLinks = () => {
			document.querySelectorAll('.nav-link').forEach((el) => {
				if (el.getAttribute('href') === path) {
					el.classList.add('active-link');
					el.firstElementChild?.classList.add('border-b-2');
					el.firstElementChild?.classList.add('border-layoutText');
				} else {
					el.classList.remove('active-link');
					el.firstElementChild?.classList.remove('border-b-2');
					el.firstElementChild?.classList.remove('border-layoutText');
				}
			});
		};

		updateLinks();
	}, [path]);

	const handleSortChange = useCallback(
		(sortBy: string) => {
			setSortOrder(sortBy); // Set the sort order in the context
		},
		[setSortOrder]
	);

	const handleFilterChange = useCallback(
		(filters: { types: string[]; teamSizes: string[] }) => {
			setFilters(filters); // Set the filters in the context
		},
		[setFilters]
	);

	return (
		<nav
			className={`border-b-border dark:border-b-darkBorder grid h-[50px] ${
				isPortfolioLink
					? 'grid-cols-[1fr_1fr_50px_50px_50px]'
					: 'grid-cols-[1fr_1fr_50px_50px]'
			} rounded-tr-base border-b-4 bg-black text-layoutText text-xl w600:text-lg w400:h-10 w400:text-base portrait:rounded-none`}
		>
			<Link
				className={clsx(
					'nav-link flex h-full items-center justify-center bg-main uppercase border-r-2 border-black rounded-md hover:opacity-75'
				)}
				href='/'
			>
				<div className='flex items-center justify-center space-x-2 transition-colors duration-500'>
					<h2>Home</h2>
					<Home className='size-5' />
				</div>
			</Link>
			<Link
				className={clsx(
					'nav-link flex h-full items-center justify-center bg-main uppercase border-x-2 border-black rounded-md hover:opacity-75'
				)}
				href='/portfolio'
			>
				<div className='flex items-center justify-center space-x-2 transition-colors duration-500'>
					<h2>Portfolio</h2>
					<FileAxis3d className='size-5' />
				</div>
			</Link>
			{isPortfolioLink && (
				<ProjectFilter
					className='w-full h-full bg-main'
					onSortChange={handleSortChange}
					onFilterChange={handleFilterChange}
				/>
			)}
			<ThemeSwitcher />
			<ColorSwitcher />
		</nav>
	);
}
