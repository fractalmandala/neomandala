/* eslint-disable @typescript-eslint/no-unused-vars */
export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Web Dev Guides at Fractal Maṇḍala',
			description: 'A collections of quick guides on web development on Sveltekit.',
			url: 'https://www.fractalmandala.in/web',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'			
		};
	}) satisfies PageLoad;