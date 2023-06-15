import { writable, derived } from 'svelte/store';
import { get, type Readable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const indexName = writable('')
export const indexLinks = writable({})
export const indexCategory = writable('')
export const indexImage = writable('')
export const indexTags = writable({})
export const pageTitle = writable('Fractal Maṇḍala')
export const pageDescription = writable('Digital garden and buildstation')
export const pageImage = writable('/images/cheggit.webp')
export const shareImage = writable('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp')
export const pageUrl = writable('https://www.fractalmandala.in')
export const thisChap = writable('')

export const scrollY = writable(0);

export const loadingStore = writable(false);

const initialWidth = browser ? window.innerWidth : 1024;
export const windowWidth = writable(initialWidth);

export const siteName = 'Fractal Maṇḍala';

const headerTop = browser ? JSON.parse(localStorage.getItem('headerMode') || 'true') : true;

export const headerMode = writable(headerTop);

export function headerBelow() {
	if (browser) {
		headerMode.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('headerMode', JSON.stringify(newMode));
			return newMode;
		});
	}
}

const storedThemeMode = browser ? JSON.parse(localStorage.getItem('themeMode') || 'false') : false;

export const themeMode = writable(storedThemeMode);

export function toggleVisibility() {
	if (browser) {
		themeMode.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('themeMode', JSON.stringify(newMode));
			return newMode;
		});
	}
}

const storedReadingMode = browser
	? JSON.parse(localStorage.getItem('readingMode') || 'false')
	: false;

export const readingMode = writable(storedReadingMode);

export const breakOne = derived(
	windowWidth,
	($windowWidth) => $windowWidth <= 1023 && $windowWidth > 768
);

export const breakTwo = derived(windowWidth, ($windowWidth) => $windowWidth <= 768);

export const breakZero = derived(windowWidth, ($windowWidth) => $windowWidth > 1023);

export const breakZeroOne = derived(windowWidth, ($windowWidth) => $windowWidth <= 1023);

export function writableToReadable<T>({ subscribe }: Writable<T>): Readable<T> {
	return { subscribe: subscribe };
}

export function isReadable<T>(ref: T | Readable<T>): boolean {
	if (ref === null) return false;

	if (typeof ref === 'object') {
		return 'subscribe' in ref;
	}

	return false;
}

export function unwrapReadable<T>(ref: T | Readable<T>) {
	if (isReadable(ref)) {
		return get(ref as Readable<T>);
	}

	return ref as T;
}

const storedChatMode = browser ? JSON.parse(localStorage.getItem('chatMode') || 'false') : false;

export const chatMode = writable(storedChatMode);

export const appKey = writable('');

export const uuidStore = writable('');
