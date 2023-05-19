import { writable } from 'svelte/store';

const initialValue = { x: window.scrollX, y: window.scrollY };
const { subscribe, set } = writable(initialValue);

export const scroll = {
  subscribe,
  set,
  update: () => {
    window.addEventListener('scroll', updateScroll);
    function updateScroll() {
      set({ x: window.scrollX, y: window.scrollY });
    }
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  },
};
