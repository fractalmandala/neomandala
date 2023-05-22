import { get, writable } from 'svelte/store';

export const introOutStore = writable<boolean>(false);

export function setIntroOutStore(val: boolean) {
	introOutStore.set(val);
}

export const thresholdsStore = writable<Record<string, number>>({});

export function addThreshold({ id, value }: { id: string; value: number }) {
	thresholdsStore.update((pre) => {
		return Object.assign({}, pre, { [id]: value });
	});
}

export const homePageLoadedComponentsStore = writable<Record<string, boolean>>({});

export function setHomePageLoadedComponentsStore(componentName: string) {
	if (get(homePageLoadedComponentsStore)[componentName]) return;

	homePageLoadedComponentsStore.update((pre) => Object.assign({}, pre, { [componentName]: true }));
}