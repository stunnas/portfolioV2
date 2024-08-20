'use client';

import { useEffect, useState } from 'react';
import { getEnhancedProjects, Project } from '@/lib/data/projects';
import { AspectRatio } from '@/components/neobrutalism-ui/aspect-ratio';
import { useProjectFilter } from '@/lib/context/project-filter-context';

export default function PortfolioPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
	const { sortOrder, filters, setTotalProjects } = useProjectFilter(); // Access the context

	useEffect(() => {
		const fetchProjects = async () => {
			const enhancedProjects = await getEnhancedProjects();
			setProjects(enhancedProjects);
			setFilteredProjects(enhancedProjects); // Initialize filtered projects
			setTotalProjects(enhancedProjects.length); // Set total projects in context
		};

		fetchProjects();
	}, [setTotalProjects]);

	useEffect(() => {
		applyFiltersAndSort();
	}, [filters, sortOrder]);

	const applyFiltersAndSort = () => {
		let tempProjects = [...projects];

		// Apply filtering
		if (filters.types.length > 0) {
			tempProjects = tempProjects.filter((project) =>
				filters.types.includes(project.type)
			);
		}
		if (filters.teamSizes.length > 0) {
			tempProjects = tempProjects.filter((project) =>
				filters.teamSizes.includes(project.teamSize)
			);
		}

		// Apply sorting
		tempProjects = sortProjects(tempProjects, sortOrder);

		setFilteredProjects(tempProjects);
	};

	const sortProjects = (projects: Project[], sortOrder: string) => {
		return [...projects].sort((a, b) => {
			switch (sortOrder) {
				case 'date-added-newest':
					return (
						new Date(b.dateCreated || '').getTime() -
						new Date(a.dateCreated || '').getTime()
					);
				case 'date-added-oldest':
					return (
						new Date(a.dateCreated || '').getTime() -
						new Date(b.dateCreated || '').getTime()
					);
				case 'alphabetical-a-z':
					return a.name.localeCompare(b.name);
				case 'alphabetical-z-a':
					return b.name.localeCompare(a.name);
				case 'random':
					return Math.random() - 0.5;
				default:
					return 0;
			}
		});
	};

	// Update totalProjects in context whenever filteredProjects changes
	useEffect(() => {
		setTotalProjects(filteredProjects.length);
	}, [filteredProjects, setTotalProjects]);

	return (
		<>
			{filteredProjects.map((project, id) => (
				<div
					className='dark:bg-darkBg border-b-4 border-r-4 border-b-black border-r-black bg-bg p-8 py-10 w600:px-[30px] w400:px-5'
					key={id}
				>
					<div className='mx-auto w-3/4'>
						<AspectRatio
							className='flex rounded-base border-2 border-black shadow-base'
							ratio={1 / 1}
						>
							<img
								className='w-full rounded-base'
								src={project.previewImage}
								alt={project.name}
							/>
						</AspectRatio>

						<div className='mt-6'>
							<h2 className='text-3xl font-bold w700:text-2xl w450:text-xl'>
								{project.name} -{' '}
								{project.type.charAt(0).toUpperCase() + project.type.slice(1)}
							</h2>

							<p className='mt-5 text-lg w450:text-base'>
								{project.description}
							</p>
							{project.dateCreated && (
								<p className='text-sm mt-2'>Created: {project.dateCreated}</p>
							)}
							{project.dateModified && (
								<p className='text-sm'>Last Modified: {project.dateModified}</p>
							)}

							<div className='mt-8 grid grid-cols-2 gap-5 text-base w400:text-sm'>
								<a
									className='bg-main text-layoutText border-border dark:border-darkBorder shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 px-4 py-2 text-center uppercase transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none'
									href={project.liveLink}
									target='_blank'
								>
									Visit
								</a>
								{project.repoUrl && (
									<a
										className='bg-main text-layoutText border-border dark:border-darkBorder shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 px-4 py-2 text-center uppercase transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none'
										href={project.repoUrl}
										target='_blank'
									>
										Github
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}
