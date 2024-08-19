'use client';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';
import { slugs } from '@/lib/data/icon-cloud';
import { companies } from '@/lib/data/companies';
import { links } from '@/lib/data/links';
import IconCloud from '@/components/magic-ui/icon-cloud';
import AnimatedGradientText from '@/components/magic-ui/animated-gradient-text';
import { Marquee } from '@/components/lukacho-ui/marquee';

export default function Home() {
	const theme = useTheme();
	const repeatedCompanies = [...companies, ...companies];

	return (
		<div className='w-full max-w-[880px] flex flex-col items-center justify-center overflow-hidden w600:p-[30px] w600:text-lg w400:p-5 w400:text-base p-10 text-xl leading-[1.7]'>
			<AnimatedGradientText className='relative flex items-center justify-center overflow-hidden rounded-full bg-background p-4 my-4'>
				<div className=' '>
					<IconCloud
						iconSlugs={slugs}
						className='w-full scale-90'
					/>
				</div>
			</AnimatedGradientText>

			<p>Skill Tag Cloud!</p>

			<Marquee>
				{repeatedCompanies.map((company, index) => (
					<div
						key={index}
						className='relative h-full flex items-center justify-center mx-4 w-[100px]'
					>
						<Image
							src={theme === 'light' ? company.lightHref : company.darkHref}
							alt={company.icon}
							width={150}
							height={150}
							className='w-full h-auto' // Ensuring the images maintain their aspect ratio
						/>
					</div>
				))}
			</Marquee>

			<p>
				This is the windowed portfolio neobrutalism template that I customized
				the hell out of! Check out{' '}
				<a
					className='font-bold underline'
					target='_blank'
					href='https://github.com/stunnas/portfolioV2'
				>
					this website&apos;s repo
				</a>{' '}
				or even the{' '}
				<a
					className='font-bold underline'
					target='_blank'
					href='https://github.com/neobrutalism-templates/windowed-portfolio'
				>
					template github repo.
				</a>{' '}
			</p>
			<div className='mr-auto mt-10 flex w-full flex-wrap items-center gap-10'>
				{links.map((link, id) => {
					return (
						<a
							target='_blank'
							key={id}
							href={link.href}
						>
							<AnimatedGradientText>
								<link.icon
									title={`${link.icon}`}
									className={`${link.text?.length ? 'mr-2' : ''}`}
								/>
								{link.text}
							</AnimatedGradientText>
						</a>
					);
				})}
			</div>
		</div>
	);
}
