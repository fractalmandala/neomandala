export const prerender = true;
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		return { 
			in: false,
			title: 'Knowledge Index at Fractal Maṇḍala',
			description: 'An index of entries in the digital garden.',
			url: 'https://www.fractalmandala.in/know',
			image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png'			
		}
	}

	const { data: testTable } = await supabase.from('test').select('*');
	return {
		a: 'signed in',
		in: true,
		testTable,
		user: session.user,
		sessionID: session,
		title: 'Knowledge Index at Fractal Maṇḍala',
		description: 'An index of entries in the digital garden.',
		url: 'https://www.fractalmandala.in/know',
		image: 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png'		
	};
};
