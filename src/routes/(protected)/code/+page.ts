
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const ssr = true

export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: testTable } = await supabase.from('test').select('*');
	return {
		a: 'signed in',
		in: true,
		testTable,
		user: session.user,
		sessionID: session
	};
};
