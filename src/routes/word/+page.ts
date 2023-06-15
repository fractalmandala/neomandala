/* eslint-disable @typescript-eslint/no-unused-vars */
export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Writings at Fractal Maṇḍala',
			description: 'A collections of writings and essays on dharma, history and more.',
			url: 'https://www.fractalmandala.in/word',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'			
		};
	}) satisfies PageLoad;