'use client';
import React, { createContext, useContext, useState } from 'react';

type FilterState = {
	types: string[];
	teamSizes: string[];
};

type ProjectFilterContextType = {
	sortOrder: string;
	filters: FilterState;
	totalProjects: number;
	setSortOrder: (order: string) => void;
	setFilters: (filters: FilterState) => void;
	setTotalProjects: (total: number) => void;
};

const ProjectFilterContext = createContext<
	ProjectFilterContextType | undefined
>(undefined);

export const ProjectFilterProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [sortOrder, setSortOrder] = useState<string>('date-added-newest');
	const [filters, setFilters] = useState<FilterState>({
		types: [],
		teamSizes: [],
	});
	const [totalProjects, setTotalProjects] = useState<number>(0);

	return (
		<ProjectFilterContext.Provider
			value={{
				sortOrder,
				filters,
				totalProjects,
				setSortOrder,
				setFilters,
				setTotalProjects,
			}}
		>
			{children}
		</ProjectFilterContext.Provider>
	);
};

export const useProjectFilter = () => {
	const context = useContext(ProjectFilterContext);
	if (!context) {
		throw new Error(
			'useProjectFilter must be used within a ProjectFilterProvider'
		);
	}
	return context;
};
