import { writable } from 'svelte/store';

export let counterStore = writable(1);

export function increment() {
  counterStore.update(value => value + 1);
}

