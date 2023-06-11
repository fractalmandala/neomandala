import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		return { 
			in: false,
			title: 'Fractal Maṇḍala',
			description: 'A digital garden and buildstation',
			url: 'https://www.fractalmandala.in/',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'
			}
	}

	const { data: testTable } = await supabase.from('test').select('*');
	return {
		a: 'signed in',
		in: true,
		testTable,
		user: session.user,
		sessionID: session,
		title: 'Fractal Maṇḍala',
		description: 'A digital garden and buildstation',
		url: 'https://www.fractalmandala.in/',
		image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp'
	};
};
