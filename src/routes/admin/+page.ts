import type { PageLoad } from './$types';


export const load: PageLoad = async ({ parent }) => {
	const { session, supabase } = await parent();
	if (!session) {
		return {
			a: 'sign up, so you can sign in!',
			in: false,
			sessionID: ''
		}
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