import {
	IconType,
	SiGithub,
	SiGmail,
	SiLinkedin,
	SiReadme,
} from '@icons-pack/react-simple-icons';

export const links: { icon: IconType; text?: string; href: string }[] = [
	{
		icon: SiGmail,
		href: 'mailto:caa.develops@gmail.com',
	},
	{
		icon: SiGithub,
		href: 'https://github.com/stunnas',
	},
	{
		icon: SiLinkedin,
		href: 'https://www.linkedin.com/in/calbritton/',
	},
	{
		icon: SiReadme,
		text: 'Resume',
		href: 'https://www.linkedin.com/in/calbritton/',
	},
];
