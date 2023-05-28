import { writable } from 'svelte/store';

const initialFoot = {
	isShown: false
};

export const footerStore = writable(initialFoot);

export function showFooter() {
	footerStore.update((state) => ({ ...state, isShown: true }));
}

export function hideFooter() {
	footerStore.update((state) => ({
		...state,
		isShown: false
	}));
}

const initialState = {
	isShown: false,
	title: '',
	message: '',
	component: null,
	props: {}
};

export const modalStore = writable(initialState);

export function showModal(
	title: string,
	message: string,
	component: any = null,
	props: object = {}
) {
	modalStore.update((state) => ({ ...state, isShown: true, title, message, component, props }));
}

export function hideModal() {
	modalStore.update((state) => ({
		...state,
		isShown: false,
		title: '',
		message: '',
		component: null,
		props: {}
	}));
}

const initialNote = {
	isShown: false,
	title: ''
};

export const noteStore = writable(initialNote);
export function showNote(title: string) {
	noteStore.update((state) => ({ ...state, isShown: true, title }));
}
export function hideNote() {
	noteStore.update((state) => ({ ...state, isShown: false, title: '' }));
}

export const initialDrawer = {
	isShown: false,
	component: null
};

export const drawerStore = writable(initialDrawer);

export function showDrawer(component = null) {
	drawerStore.update((state) => ({ ...state, isShown: true, component }));
}

export function hideDrawer() {
	drawerStore.update((state) => ({ ...state, isShown: false, component: null }));
}

export const audioStore = writable(null);

const initialToast = {
	isShown: false,
	title: '',
	component: null
};

export const toastStore = writable(initialToast);

export function showToast(title: string, component = null) {
	toastStore.update((state) => ({ ...state, isShown: true, title, component }));
}

export function hideToast() {
	toastStore.update((state) => ({ ...state, isShown: false, title: '', component: null }));
}

const initialChip = {
	isShown: false,
	title: '',
	color: '',
	component: null
};

export const chipStore = writable(initialChip);
export function showChip(title: string, color: string, component = null) {
	chipStore.update((state) => ({ ...state, isShown: true, title, color, component }));
}
export function hideChip() {
	chipStore.update((state) => ({
		...state,
		isShown: false,
		title: '',
		color: '',
		component: null
	}));
}

const initialAlert = {
	isShown: false,
	title: '',
	component: null
};

export const alertStore = writable(initialAlert);

export function showAlert(title: string, component = null) {
	alertStore.update((state) => ({ ...state, isShown: true, title, component }));
}

export function hideAlert() {
	alertStore.update((state) => ({ ...state, isShown: false, title: '', component: null }));
}

const initialGood = {
	isShown: false,
	title: '',
	component: null
};

export const goodAlert = writable(initialGood);

export function showGood(title: string, component = null) {
	goodAlert.update((state) => ({ ...state, isShown: true, title, component }));
}

export function hideGood() {
	goodAlert.update((state) => ({ ...state, isShown: false, title: '', component: null }));
}

const initialTip = {
	isShown: false,
	message: ''
};
export const tooltipStore = writable(initialTip);
export function showTooltip(message: string) {
	tooltipStore.update((state) => ({ ...state, isShown: true, message }));
}
export function hideTooltip() {
	tooltipStore.update((state) => ({ ...state, isShown: false, message: '' }));
}

export const showBots = writable(false);
