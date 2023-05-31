import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface NoteItem {
	title: string;
	content: string;
	timestamp: string;
	id: string;
}

export interface NotesDiary {
	notes: NoteItem[];
}

export function createLocalNotesStore<T>(key: string, startValue: T): Writable<T> {
	const initialValue: T =
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		browser && localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : startValue;

	const store: Writable<T> = writable(initialValue);

	if (browser) {
		store.subscribe((value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

export const notesDiary = createLocalNotesStore<NotesDiary[]>('notesDiary', []);

export function createNewNote(title: string, content: string, timestamp: string, id: string) {
	const thisNote: NoteItem = {
		title: title,
		content: content,
		timestamp: timestamp,
		id: id
	};

	return thisNote;
}
