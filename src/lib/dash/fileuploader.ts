import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import supabase from '$lib/utils/supabase';
import { showNote } from '$lib/dash/alerts';

const storedFileMode = browser ? JSON.parse(localStorage.getItem('fileMode') || 'false') : false;

export const fileMode = writable(storedFileMode);

export function toggleUpload() {
	if (browser) {
		fileMode.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('fileMode', JSON.stringify(newMode));
			return newMode;
		});
	}
}

export async function addNote(
	title: string,
	tags: string,
	content: string,
	language: string,
	type: string
) {
	const { error } = await supabase.from('amrit-notes').insert({
		title: title,
		tags: tags,
		content: content,
		uuidtext: language,
		agent: type
	});
	if (error) {
		showNote('error!', false);
	} else {
		showNote('Sent!', true);
	}
}

export async function addCode(title: string, tags: string, content: string, language: string) {
	const { error } = await supabase.from('amrit-notes').insert({
		title: title,
		tags: tags,
		content: content,
		uuidtext: language,
		agent: 'snippet'
	});
	if (error) {
		showNote('error', false);
	} else {
		showNote('Sent!', true);
	}
}
