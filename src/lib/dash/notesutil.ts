import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';
import { showNote } from '$lib/dash/alerts';

export interface NoteItem {
	title: string;
	content: string;
	timestamp: string;
	id: string;
}


export interface NotesDiary {
	title: string;
	content: string;
	timestamp: string;
	id: string;
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

export function addNewNote(title: string, content: string) {
	const id = uuidv4()
	const timestamp = new Date().toISOString();
	const newNote: NoteItem = createNewNote(title, content, timestamp, id);
	get(notesDiary).push(newNote);
	notesDiary.set(get(notesDiary));
	showNote('done!', false);
}

export function updateExistingNote(title: string, content: string, timestamp: string, id: string) {
	const noteArray = get(notesDiary);
	const foundIndex = noteArray.findIndex((note) => note.id === id);

	if (foundIndex !== -1) {
		noteArray[foundIndex] = createNewNote(title, content, timestamp, id);
		notesDiary.set(noteArray);
	}
}

export function getNoteById(id: string): NotesDiary | undefined {
	const notes = get(notesDiary); // get the current value of the chatSessions store
	return notes.find((note) => note.id === id); // find and return the session with the given id
}

export function deleteNoteItem(id: string) {
	notesDiary.update((note) => note.filter((note) => note.id !== id));
}