/* eslint-disable @typescript-eslint/no-unused-vars */
export const prerender = true;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
		return {
			title: 'Videos at Fractal Maṇḍala',
			description: 'A collection of talks and dialogues I`ve participated in.',
			url: 'https://www.fractalmandala.in/video',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'			
		};
	}) satisfies PageLoad;