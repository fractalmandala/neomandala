/* eslint-disable @typescript-eslint/no-unused-vars */
export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Wombo at Fractal Maṇḍala',
			description: 'A visual story.',
			url: 'https://www.fractalmandala.in/image/wombo',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'			
		};
	}) satisfies PageLoad;