import { writable } from 'svelte/store';

export function elementVisibility(node: HTMLElement) {
  const isVisible = writable<boolean>(false);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isVisible.set(entry.isIntersecting);
    });
  });

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
