import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';

export interface CodeSnippet {
	title: string
	snippet: string
	id: string
	type: string
	language: string
}

export interface CodesBase {
	title: string
	snippet: string
	id: string
	type: string
	language: string
}

export function createLocalCodesStore<T>(key: string, startValue: T): Writable<T> {
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

export const codesBase = createLocalCodesStore<CodesBase[]>('codesBase', []);

export function createNewCode(title: string, snippet: string, id: string, type: string, language: string) {
	const thisCode: CodeSnippet = {
		title: title,
		snippet: snippet,
		id: id,
		type: type,
		language: language
	};

	return thisCode;
}

export function addNewCode(title: string, snippet: string, type: string, language: string) {
	const id = uuidv4()
	const newCode: CodeSnippet = createNewCode(title, snippet, id, type, language);
	get(codesBase).push(newCode);
	codesBase.set(get(codesBase));
}