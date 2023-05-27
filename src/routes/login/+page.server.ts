import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { showChip } from '$lib/stores/modalstores'
import type { Actions } from './$types';

export const actions: Actions = {
	async default({
		request,
		locals: { supabase }
	}): Promise<ActionFailure<{ error: string; values?: { email: string } }>> {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			showChip('Enter Email!','#fe4a49')
		}
		if (!password) {
			showChip('Enter Password!','#fe4a49')
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/');
	}
};