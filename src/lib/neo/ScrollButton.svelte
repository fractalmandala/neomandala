<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';

	export let scrollNode: HTMLElement;

	let visible = false;
	let className = '';
	let observer: ResizeObserver | null = null;

	$: if (scrollNode) {
		destroy();

		if (window.ResizeObserver) {
			observer = new ResizeObserver(() => {
				updateVisibility();
			});
			observer.observe(scrollNode);
		}
		scrollNode.addEventListener('scroll', updateVisibility);
	}

	function updateVisibility() {
		if (!scrollNode) return;
		visible =
			Math.ceil(scrollNode.scrollTop) + 200 < scrollNode.scrollHeight - scrollNode.clientHeight;
	}

	function destroy() {
		observer?.disconnect();
		scrollNode?.removeEventListener('scroll', updateVisibility);
	}

	onDestroy(destroy);
</script>

{#if visible}
	<button
		transition:fade|local={{ duration: 150 }}
		on:click={() => scrollNode.scrollTo({ top: scrollNode.scrollHeight, behavior: 'smooth' })}
		class="blank-button">Scroll</button
	>
{/if}
