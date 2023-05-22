import type { Readable } from "svelte/store";
import { eventListenerStore } from '$lib/stores/eventlistener'
import { toggleStore } from '$lib/stores/togglestore'

export function hoverStore<T extends HTMLElement = HTMLElement>(
	ref: T | undefined | null
): Readable<boolean> {
	const { value, on, toggle } = toggleStore();

	if (ref && ref !== null) {
		eventListenerStore("mouseenter", on, ref);
		eventListenerStore("mouseleave", toggle, ref);
	}

	return value;
}