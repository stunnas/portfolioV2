import { AspectRatio } from '@/components/neobrutalism-ui/aspect-ratio';

export default function Page() {
	const PROJECTS = [
		{
			name: 'Hello World',
			description: 'An animated experience to the famous quote.',
			liveLink: 'https://hello-world-stunna.vercel.app/',
			previewImage: '/projects/helloworld.png',
			repoUrl: 'https://github.com/stunnas/hello-world',
		},
		{
			name: 'Compleo',
			description: 'Landing page for AI powered productivity app.',
			liveLink: 'https://compleo.vercel.app',
			previewImage: '/projects/compleo.png',
			repoUrl: 'https://github.com/stunnas/compleoWeb',
		},
		{
			name: 'Moosie Couture',
			description: 'All your animal drinkware and sticker needs!',
			liveLink: 'https://moosie-couture.vercel.app',
			previewImage: '/projects/moosiecouture.webp',
			repoUrl: 'https://github.com/stunnas/moosie-couture',
		},
		{
			name: 'Audio Glow',
			description:
				'Showcasing a music visualizer using ThreeJS alongside a playlist system.',
			liveLink: 'https://audioglow.vercel.app/',
			previewImage: '/projects/musicvisualizer.png',
			repoUrl: 'https://github.com/stunnas/audioglow',
		},
		{
			name: 'Word Assistant',
			description: 'Check your text stats with the word assistant.',
			liveLink: 'https://wordassistant.vercel.app/',
			previewImage: '/projects/wordassistant.png',
			repoUrl: 'https://github.com/stunnas/wordassistant',
		},
	];

	return (
		<>
			{PROJECTS.map((project, id) => {
				return (
					<div
						className='dark:bg-darkBg border-b-4 border-r-4 border-b-black border-r-black bg-bg p-8 py-10 w600:px-[30px] w400:px-5'
						key={id}
					>
						<div className='mx-auto w-3/4'>
							<AspectRatio
								className='rounded-base border-2 border-black shadow-base'
								ratio={1 / 1}
							>
								<img
									className='w-full rounded-base'
									src={`${project.previewImage}`}
									alt={project.name}
								/>
							</AspectRatio>

							<div className='mt-6'>
								<h2 className='text-3xl font-bold w700:text-2xl w450:text-xl'>
									{project.name}
								</h2>

								<p className='mt-5 text-lg w450:text-base'>
									{project.description}
								</p>

								<div className='mt-8 grid grid-cols-2 gap-5 text-base w400:text-sm'>
									<a
										className='bg-main text-layoutText border-border dark:border-darkBorder shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 px-4 py-2 text-center uppercase transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none'
										href={project.liveLink}
										target='_blank'
									>
										Visit
									</a>

									<a
										className=' bg-main text-layoutText border-border dark:border-darkBorder shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 px-4 py-2 text-center uppercase transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none'
										href={project.repoUrl}
										target='_blank'
									>
										Github
									</a>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}
