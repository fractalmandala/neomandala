<script lang="ts">
	import Copy from '$lib/design/iconset/copy.svelte';
	import Complete from '$lib/design/iconset/copy.svelte';
	export let content: string;
	export let title = 'Copy';

	let complete = false;

	const copyText = async () => {
		try {
			await navigator.clipboard.writeText(content);
			complete = true;
		} catch (error) {
			console.error(error);
		}
	};

	const clickOutside = (element: HTMLElement, callbackFunction: () => void) => {
		function onClick(event: MouseEvent) {
			if (!element.contains(event.target as Node)) {
				callbackFunction();
			}
		}
		document.body.addEventListener('click', onClick);
		return {
			update(newCallbackFunction: () => void) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	};
</script>

<button class="zoom-button" {title} use:clickOutside={() => (complete = false)} on:click={copyText}>
	{#if !complete}
		<Copy />
	{:else}
		<Complete color={'#10D56C'} />
	{/if}
</button>
