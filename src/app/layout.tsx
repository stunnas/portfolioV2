import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/sections/nav';
import Ripple from '@/components/magic-ui/ripple';
import { BackgroundProvider } from '@/hooks/use-background';

const archivo = Archivo({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Chase Albritton Portfolio | CAA Showcase',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={archivo.className + ' relative overflow-y-auto'}>
				<Ripple />
				<BackgroundProvider>
					<div className='relative w-full h-full flex justify-center items-center z-10 '>
						<div className='outline-border dark:outline-darkBorder grid h-[800px] max-h-[100dvh] w-[1000px] max-w-[1000px] grid-cols-[100px_auto] animate-shadow-move rounded-base outline outline-4 w600:grid-cols-[70px_auto] w500:grid-cols-1 portrait:h-[100dvh]'>
							<header className='border-r-border dark:border-r-darkBorder relative flex items-center justify-center rounded-l-base border-r-4 bg-main w500:hidden portrait:rounded-none'>
								<h1 className='-rotate-90 whitespace-nowrap text-[40px] text-layoutText transition-colors duration-500 font-bold tracking-[4px] smallHeight:text-[30px] smallHeight:tracking-[2px] w600:text-[30px] w600:tracking-[2px]'>
									CHASE ALBRITTON
								</h1>
							</header>
							<main className='dark:bg-darkBg relative flex w-full h-[800px] max-h-[100dvh] flex-col rounded-br-base rounded-tr-base bg-bg font-semibold portrait:h-[100dvh] portrait:max-h-[100dvh] portrait:rounded-none'>
								<Nav />
								<div className='main w-full h-full max-h-[750px] overflow-y-auto portrait:max-h-[calc(100dvh-50px)] text-black dark:text-white'>
									{children}
								</div>
							</main>
						</div>
					</div>
				</BackgroundProvider>

				<link
					rel='icon'
					href='/caa.png'
					sizes='any'
				/>
			</body>
		</html>
	);
}
