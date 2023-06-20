import type { PageLoad } from './$types';


export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session) {
		return {
			logged: false
		}
	}
	return {
		logged: true
	};
};
