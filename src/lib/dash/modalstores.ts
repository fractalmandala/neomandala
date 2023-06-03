import { writable } from 'svelte/store';

//declaring an initial state of the modal, where it is not visible, and contents are empty.
const initialState = {
	isShown: false,
};

//exporting this so it can be pulled to other components and values changed
export const pinnedNotesStore = writable(initialState);


//function to show modal
export function showPinned() {
	pinnedNotesStore.update((state) => ({ ...state, isShown: true }));
}

//function to close modal
export function hidePinned() {
	pinnedNotesStore.update((state) => ({
		...state,
		isShown: false,
	}));
}
