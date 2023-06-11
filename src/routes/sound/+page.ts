export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Music at Fractal Maṇḍala',
			description: 'Sample the best absolutely amateurish, poorly mastered psytrance in the world.',
			url: 'https://www.fractalmandala.in/sound',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png'			
		};
	}) satisfies PageLoad;