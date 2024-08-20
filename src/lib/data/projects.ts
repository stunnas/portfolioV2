export type Project = {
	name: string;
	description: string;
	liveLink: string;
	previewImage: string;
	repoUrl?: string;
	type: 'landing page' | 'tool' | 'game';
	teamSize: 'solo' | '2-5 members' | '6+ members';
	dateCreated?: string;
	dateModified?: string;
};

// Function to fetch creation and modification dates from GitHub
async function fetchRepoDates(
	repoUrl: string
): Promise<{ dateCreated?: string; dateModified?: string }> {
	const repoName = repoUrl.split('/').slice(-2).join('/');
	const response = await fetch(`https://api.github.com/repos/${repoName}`);
	const data = await response.json();

	// Format dates
	const dateCreated = data.created_at ? formatDate(data.created_at) : undefined;
	const dateModified = data.updated_at
		? formatDate(data.updated_at)
		: undefined;

	return {
		dateCreated,
		dateModified,
	};
}

function formatDate(dateString: string | undefined): string | undefined {
	if (!dateString) return undefined;
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
// Enhance projects with GitHub data
export async function getEnhancedProjects(): Promise<Project[]> {
	const enhancedProjects = await Promise.all(
		projects.map(async (project) => {
			if (project.repoUrl) {
				const dates = await fetchRepoDates(project.repoUrl);
				return {
					...project,
					dateCreated: dates.dateCreated,
					dateModified: dates.dateModified,
				};
			}
			return project;
		})
	);
	return enhancedProjects;
}

export const projects: Project[] = [
	{
		name: 'Hello World',
		description: 'An animated experience to the famous quote.',
		liveLink: 'https://hello-world-stunna.vercel.app/',
		previewImage: '/projects/helloworld.png',
		repoUrl: 'https://github.com/stunnas/hello-world',
		type: 'landing page',
		teamSize: 'solo',
	},
	{
		name: 'Compleo',
		description: 'Landing page for AI powered productivity app.',
		liveLink: 'https://compleo.vercel.app',
		previewImage: '/projects/compleo.png',
		repoUrl: 'https://github.com/stunnas/compleoWeb',
		type: 'landing page',
		teamSize: '2-5 members',
	},
	{
		name: 'Moosie Couture',
		description: 'All your animal drinkware and sticker needs!',
		liveLink: 'https://moosie-couture.vercel.app',
		previewImage: '/projects/moosiecouture.webp',
		repoUrl: 'https://github.com/stunnas/moosie-couture',
		type: 'landing page',
		teamSize: 'solo',
	},
	{
		name: 'Audio Glow',
		description:
			'Showcasing a music visualizer using ThreeJS alongside a playlist system.',
		liveLink: 'https://audioglow.vercel.app/',
		previewImage: '/projects/musicvisualizer.png',
		repoUrl: 'https://github.com/stunnas/audioglow',
		type: 'tool',
		teamSize: 'solo',
	},
	{
		name: 'Word Assistant',
		description: 'Check your text stats with the word assistant.',
		liveLink: 'https://wordassistant.vercel.app/',
		previewImage: '/projects/wordassistant.png',
		repoUrl: 'https://github.com/stunnas/wordassistant',
		type: 'tool',
		teamSize: 'solo',
	},
	{
		name: 'Portfolio Version 1',
		description: 'Check out the other variation of my portfolio.',
		liveLink: 'https://caa-v1.vercel.app/',
		previewImage: '/caa.png',
		repoUrl: 'https://github.com/stunnas/wordassistant',
		type: 'landing page',
		teamSize: 'solo',
	},
	{
		name: 'Introspection',
		description:
			'Top-down bullethell-like action game about a man forced to confront his past.',
		liveLink: 'https://store.steampowered.com/app/2796590/Introspection/',
		previewImage: '/projects/introspection.jpg',
		type: 'game',
		teamSize: '6+ members',
	},
];
