export function clickToCopy(node: HTMLElement) {
  node.style.cursor = 'copy';
  node.addEventListener('click', () => {
    navigator.clipboard.writeText(node.textContent || '');
  });

  return {
    destroy() {
      node.removeEventListener('click', () => {
        navigator.clipboard.writeText(node.textContent || '');
      });
    }
  }
}
