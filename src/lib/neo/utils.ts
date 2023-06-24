import type { Model } from "$lib/neo/types";

export function trimSuffix(input: string, end: string): string {
	if (input.endsWith(end)) {
		return input.slice(0, input.length - end.length);
	}
	return input;
}

export function trimPrefix(input: string, prefix: string) {
	if (input.startsWith(prefix)) {
		return input.slice(prefix.length);
	}
	return input;
}

export function deepestChild(el: HTMLElement): HTMLElement {
	if (el.lastElementChild && el.lastElementChild.nodeType !== Node.TEXT_NODE) {
		return deepestChild(el.lastElementChild as HTMLElement);
	}
	return el;
}

export const findCurrentModel = (models: Model[], id?: string) =>
	models.find((m) => m.id === id) ?? models[0];
