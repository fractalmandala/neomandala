import { get_current_component, onDestroy } from "svelte/internal";
import { get } from "svelte/store";
import type { Readable, Writable } from 'svelte/store'
import { is_client } from "svelte/internal";

export function tryOnDestroy(fn: () => void) {
	try {
		get_current_component();
		onDestroy(fn);
	} catch {
		// fail silently
	}
}

export const isClient = is_client;
export const defaultWindow = is_client ? window : undefined;

export function writableToReadable<T>({ subscribe }: Writable<T>): Readable<T> {
	return { subscribe: subscribe };
}