import { createClient } from '@supabase/supabase-js';
import { showNote } from '$lib/dash/alerts';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;

export async function allNotes() {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('agent', 'article')
		.order('id', { ascending: false })
	if (error) throw new Error(error.message);
	return data;
}

export async function deleteNote(id:number) {
	const { error } = await supabase
		.from('amrit-notes')
		.delete()
		.eq('id', id)
		if (error) {
			showNote('error!', false)
		} else
		showNote('deleted!', true)
}

export async function recentLinks() {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('agent', 'bookmark')
		.order('id', { ascending: false })
		.limit(10);
	if (error) throw new Error(error.message);
	return data;
}

export async function lastNote() {
	const { data, error } = await supabase
		.from('brhat-dhiti')
		.select()
		.order('id', { ascending: false })
		.limit(1);
	if (error) throw new Error(error.message);
	return data;
}

export async function insertBookmark(
	confirmationMessage: string,
	submitting: boolean,
	title: string,
	content: string
) {
	confirmationMessage = '';
	submitting = true;
	const { error } = await supabase
		.from('amrit-notes')
		.insert({ title: title, content: content, agent: 'bookmark' });
	if (error) {
		showNote('Error!', false);
	} else {
		submitting = false;
		title = 'Done!';
		content = '';
	}
}

export async function snippets() {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('agent', 'snippet')
		.order('id', { ascending: false });
	if (error) throw new Error(error.message);
	return data;
}

export async function showCode(id: number) {
	const { data, error } = await supabase.from('amrit-notes').select().eq('id', id);
	if (error) throw new Error(error.message);
	return data;
}
