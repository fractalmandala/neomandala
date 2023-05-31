import { writable } from 'svelte/store';

const initialNote = {
	isShown: false,
	title: '',
	color: true
};

export const noteStore = writable(initialNote);
export function showNote(title: string, color: boolean) {
	noteStore.update((state) => ({ ...state, isShown: true, title, color }));
}
export function hideNote() {
	noteStore.update((state) => ({
		...state,
		isShown: false,
		title: '',
		color: true
	}));
}
