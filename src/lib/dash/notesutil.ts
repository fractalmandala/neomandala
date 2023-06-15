import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';
import { showNote } from '$lib/dash/alerts';

export interface Writeup {
	title: string;
	content: string;
	type: string;
}

export interface Writeups {
	title: string;
	content: string;
	type: string;
}

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

export function createLocalPad<T>(key: string, startValue: T): Writable<T> {
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

export const allWriteups = createLocalPad<Writeups[]>('allWriteups', []);

export function createNewWrite(title: string, content: string, type: string) {
	const thisNote: Writeup = {
		title: title,
		content: content,
		type: type
	};

	return thisNote;
}

export function addNewWrite(title: string, content: string, type: string) {
	const newNote: Writeup = createNewWrite(title, content, type);
	get(allWriteups).push(newNote);
	allWriteups.set(get(allWriteups));
	showNote('done!', false);
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

export function updateExistingWrite(title: string, content: string, type: string) {
    allWriteups.update((noteArray) => {
        const foundIndex = noteArray.findIndex((note) => note.title === title);

        console.log('noteArray:', noteArray); // log current note array
        console.log('foundIndex:', foundIndex); // log found index

        if (foundIndex !== -1) {
            noteArray[foundIndex] = createNewWrite(title, content, type);
            showNote('done!', false); // This is the success case
        } else {
            console.log('No note found with the title:', title); // log the title that was not found
            showNote('uhoh!', true); // This is the error case
        }

        return noteArray;
    });
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