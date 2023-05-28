import { createClient } from '@supabase/supabase-js';
import { showChip } from '$lib/stores/modalstores';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;

export async function recentNotes() {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.neq('tags', 'gpt')
		.order('id', { ascending: false })
		.limit(5);
	if (error) throw new Error(error.message);
	return data;
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
		showChip('Error!', '#fe4a49');
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
