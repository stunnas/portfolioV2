'use client';
import Image from 'next/image';
import { useTheme } from '@/hooks/use-theme';
import { slugs } from '@/lib/data/icon-cloud';
import { companies } from '@/lib/data/companies';
import { links } from '@/lib/data/links';
import IconCloud from '@/components/magic-ui/icon-cloud';
import AnimatedGradientText from '@/components/magic-ui/animated-gradient-text';
import HyperText from '@/components/magic-ui/hyper-text';
import { Marquee } from '@/components/lukacho-ui/marquee';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Separator } from '@/components/ui/separator';
import { brutalismContainer } from '@/components/ui/brutalism-container';
import { cn } from '@/lib/utils';

export default function Home() {
	const theme = useTheme();
	const repeatedCompanies = [...companies, ...companies];

	return (
		<div className='w-full max-w-[880px] flex flex-col items-center justify-center overflow-hidden space-y-6 w600:p-[30px] w600:text-lg w400:p-5 w400:text-base p-10 text-xl leading-[1.7]'>
			<div className='space-y-4 my-2'>
				<div className='flex justify-center'>
					<CardContainer className='max-w-full group'>
						<CardBody className='relative group/card border-current w-full sm:w-[30rem] h-auto rounded-xl border'>
							<CardItem
								translateZ='125'
								className='w-full flex justify-center'
							>
								<Image
									src='/headshot.png'
									alt='headshot'
									height={1000}
									width={1000}
									className='w-3/4'
									priority={true}
								/>
							</CardItem>
						</CardBody>
					</CardContainer>
				</div>
				<div className='flex flex-col justify-center items-center text-center space-y-4'>
					<div className='flex flex-row w500:flex-col items-center justify-center space-x-4 w500:space-y-2 w500:space-x-0'>
						<HyperText
							duration={3000}
							text='Chase Albritton'
						/>
						<HyperText
							duration={3000}
							text='front-end web/game developer'
						/>
					</div>
					<h2>Based in Raleigh, NC. Always gamifying the user experience!</h2>
				</div>
				<div className='mr-auto grid w500:grid-cols-2 grid-cols-4 w-full justify-center items-center '>
					{links.map((link, id) => {
						return (
							<a
								target='_blank'
								key={id}
								href={link.href}
								className='w-full m-2'
							>
								<AnimatedGradientText>
									<link.icon
										title={`${link.icon}`}
										className='mr-2'
									/>
									{link.text}
								</AnimatedGradientText>
							</a>
						);
					})}
				</div>
			</div>

			<div className='w-full'>
				<div className='max-w-min'>
					<HyperText
						duration={3000}
						text='Companies'
					/>
				</div>
			</div>
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
			<div className='w-full'>
				<div className='max-w-min'>
					<HyperText
						className=''
						duration={3000}
						text='Skills'
					/>
				</div>
			</div>

			<AnimatedGradientText className='relative flex items-center justify-center overflow-hidden rounded-full bg-background'>
				<div className=' '>
					<IconCloud
						iconSlugs={slugs}
						className='w-full scale-90'
					/>
				</div>
			</AnimatedGradientText>

			<Separator />

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
		</div>
	);
}
