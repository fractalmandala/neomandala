import { writable } from 'svelte/store';

const initialNote = {
	isShown: false,
	title: '',
	status: false
};

export const noteStore = writable(initialNote);
export function showNote(title: string, status: boolean) {
	noteStore.update((state) => ({ ...state, isShown: true, title, status }));
}

export function hideNote() {
	noteStore.update((state) => ({
		...state,
		isShown: false,
		title: '',
		status: false
	}));
}
