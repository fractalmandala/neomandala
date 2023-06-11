export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Deep Green at Fractal Maṇḍala',
			description: 'A visual story.',
			url: 'https://www.fractalmandala.in/image/deepgreen',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png'			
		};
	}) satisfies PageLoad;