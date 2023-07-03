import { AuthApiError } from '@supabase/supabase-js';
import { redirect, type ActionFailure } from '@sveltejs/kit';
import { showNote } from '$lib/dash/alerts';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({
		request,
		url,
		locals: { supabase }
	}): Promise<
		ActionFailure<{ error: string; values?: { email: string } }> | { message: string }> => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			showNote('enter email!', true);
		}
		if (!password) {
			showNote('password!', true);
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: url.origin }
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				showNote('invalid credentials!', false);
			}

			showNote('server error!', false);
		}

		showNote('SUCCESS! CHECK EMAIL!', true);
		return {
			message: 'Please check your email for a magic link to log into the website.'
		};
	},

	login: async ({
		request,
		locals: { supabase }
	}): Promise<ActionFailure<{ error: string; values?: { email: string } }>> => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			showNote('enter email!', true);
		}
		if (!password) {
			showNote('password!', true);
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			showNote('invalid credentials!', false);
		}

		throw redirect(303, '/');
	}
};
