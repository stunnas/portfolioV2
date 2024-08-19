import React, { useMemo, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Paintbrush, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useBackgroundContext } from '@/hooks/use-background';

export function GradientPicker({ className }: { className?: string }) {
	const { background, setBackground, setUseContrastingColor } =
		useBackgroundContext();
	const [useContrasting, setUseContrasting] = useState(false);

	const solids = [
		'#E2E2E2',
		'#ff75c3',
		'#ffa647',
		'#ffe83f',
		'#9fff5b',
		'#70e2ff',
		'#cd93ff',
		'#09203f',
	];

	const gradients = [
		'linear-gradient(to top left, #accbee, #e7f0fd)',
		'linear-gradient(to top left, #d5d4d0, #eeeeec)',
		'linear-gradient(to top left, #000000, #434343)',
		'linear-gradient(to top left, #09203f, #537895)',
		'linear-gradient(to top left, #f953c6, #b91d73)',
		'linear-gradient(to top left, #ee0979, #ff6a00)',
		'linear-gradient(to top left, #F00000, #DC281E)',
		'linear-gradient(to top left, #00c6ff, #0072ff)',
		'linear-gradient(to top left, #4facfe, #00f2fe)',
		'linear-gradient(to top left, #0ba360, #3cba92)',
		'linear-gradient(to top left, #FDFC47, #24FE41)',
		'linear-gradient(to top left, #8a2be2, #0000cd)',
		'linear-gradient(to top left, #ff007f, #ff00ff)',
		'linear-gradient(to top left, #ff7f50, #ff4500)',
		'linear-gradient(to top left, #ff1493, #ff6347)',
		'linear-gradient(to top left, #32cd32, #7fff00)',
		'linear-gradient(to top left, #00ff7f, #00fa9a)',
		'linear-gradient(to top left, #ff69b4, #ff1493)',
		'linear-gradient(to top left, #1e90ff, #00bfff)',
		'linear-gradient(to top left, #ff00ff, #800080)',
		'linear-gradient(to top left, #ffd700, #ffa500)',
		'linear-gradient(to top left, #ff6347, #ff4500)',
		'linear-gradient(to top left, #00ff00, #008000)',
		'linear-gradient(to top left, #0000ff, #00008b)',
	];

	const images = [
		'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
		'url(https://images.unsplash.com/photo-1549778399-f94fd24d4697?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
		'url(https://images.unsplash.com/photo-1548604303-af502df13131?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
		'url(https://images.unsplash.com/photo-1556139943-4bdca53adf1e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
	];

	const defaultTab = useMemo(() => {
		if (background.includes('url')) return 'image';
		if (background.includes('gradient')) return 'gradient';
		return 'solid';
	}, [background]);

	const handleBackgroundChange = (newBackground: string) => {
		setBackground(newBackground);
		if (newBackground.includes('gradient') || newBackground.includes('url')) {
			document.documentElement.style.setProperty('--bg-main', newBackground);
		} else {
			document.documentElement.style.setProperty('--main-color', newBackground);
			document.documentElement.style.setProperty(
				'--bg-main',
				`var(--main-color)`
			);
		}
	};

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

	useEffect(() => {
		setUseContrastingColor(useContrasting);
	}, [useContrasting]);

	const activeBackgroundCheck = (potentialBackground: string) => {
		let result = potentialBackground === background ? true : false;
		return result;
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn(`flex border-x-2 border-black bg-main px-2`, className)}
				>
					<Paintbrush className='text-layoutText transition-colors duration-500' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-64'>
				<Tabs
					defaultValue={defaultTab}
					className='w-full'
				>
					<TabsList className='w-full mb-4'>
						<TabsTrigger
							className='flex-1'
							value='solid'
						>
							Solid
						</TabsTrigger>
						<TabsTrigger
							className='flex-1'
							value='gradient'
						>
							Gradient
						</TabsTrigger>
						<TabsTrigger
							className='flex-1'
							value='image'
						>
							Image
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value='solid'
						className='flex flex-wrap gap-1 mt-0'
					>
						{solids.map((s) => (
							<div
								key={s}
								style={{ background: s }}
								className={`flex justify-center items-center rounded-md h-6 w-6 cursor-pointer ${activeBackgroundCheck(s) ? 'ring-2' : ''} hover:ring-2 ring-black dark:ring-white active:scale-105`}
								onClick={() => handleBackgroundChange(s)}
							>
								<CheckCircle
									className={`size-4 text-layoutText ${activeBackgroundCheck(s) ? '' : 'hidden'}`}
								/>
							</div>
						))}
					</TabsContent>

					<TabsContent
						value='gradient'
						className='mt-0'
					>
						<div className='flex flex-wrap gap-1 mb-2'>
							{gradients.map((s) => (
								<div
									key={s}
									style={{ background: s }}
									className={`flex justify-center items-center rounded-md h-6 w-6 cursor-pointer ${activeBackgroundCheck(s) ? 'ring-2' : ''} hover:ring-2 ring-black dark:ring-white active:scale-105`}
									onClick={() => handleBackgroundChange(s)}
								>
									<CheckCircle
										className={`size-4 text-layoutText ${activeBackgroundCheck(s) ? '' : 'hidden'}`}
									/>
								</div>
							))}
						</div>
						<div className='flex justify-center items-center gap-2 p-1 text-xs bg-main rounded'>
							💡
							<Link
								href='https://gradient.page/css/ui-gradients'
								className='hover:underline font-bold drop-shadow-2xl text-layoutText'
								target='_blank'
							>
								Get more at Gradient Page
							</Link>
						</div>
					</TabsContent>

					<TabsContent
						value='image'
						className='mt-0'
					>
						<div className='grid grid-cols-2 gap-1 mb-2'>
							{images.map((s) => (
								<div
									key={s}
									style={{ backgroundImage: s }}
									className={`flex justify-center items-center rounded-md bg-cover bg-center h-12 w-full cursor-pointer ${activeBackgroundCheck(s) ? 'ring-2' : ''} hover:ring-2 ring-black dark:ring-white active:scale-105`}
									onClick={() => handleBackgroundChange(s)}
								>
									<CheckCircle
										className={`size-8 text-layoutText ${activeBackgroundCheck(s) ? '' : 'hidden'}`}
									/>
								</div>
							))}
						</div>

						<div className='flex justify-center items-center gap-2 p-1 text-xs bg-main rounded'>
							🎁
							<Link
								href='https://gradient.page/wallpapers'
								className={`hover:underline font-bold drop-shadow-2xl text-layoutText`}
								target='_blank'
							>
								Get abstract wallpapers
							</Link>
						</div>
					</TabsContent>
				</Tabs>

				<Input
					id='custom'
					value={background}
					className='col-span-2 h-8 mt-4'
					onChange={(e) => handleBackgroundChange(e.currentTarget.value)}
				/>
				<div className='mt-4 flex justify-center'>
					<label
						htmlFor='use-contrasting-color'
						className='flex items-center space-x-2'
					>
						<Switch
							id='use-contrasting-color'
							checked={useContrasting}
							onCheckedChange={() => setUseContrasting(!useContrasting)}
						/>
						<h2 className='font-thin text-sm'>Contrasting Text Color</h2>
					</label>
				</div>
			</PopoverContent>
		</Popover>
	);
}
