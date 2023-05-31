import { writable } from 'svelte/store';

const initialNoteInput = {
	isShown: false
};

export const noteInputStore = writable(initialNoteInput);

export function showNoteInput() {
	noteInputStore.update((state) => ({ ...state, isShown: true }));
}

export function hideNoteInput() {
	noteInputStore.update((state) => ({
		...state,
		isShown: false
	}));
}
