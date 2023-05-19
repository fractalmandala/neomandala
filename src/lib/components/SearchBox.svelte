<script lang="ts">

	import { onMount } from 'svelte';
    import { drawerStore, hideDrawer } from '$lib/stores/modalstores'
	import type { SearchItem } from '$lib/types/SearchItem';
	import { allPosts } from '$lib/utils/localpulls';

	let posts: any;
	let inputElement: HTMLInputElement;
	let inputValue = '';
	let searchResults: SearchItem[] = [];
	let searchitems: any = [];
	let isFocused = false;
	let resultsWindow = false;

	async function loadItems() {
		searchitems = await allPosts();
	}

	loadItems();

	async function handleInput() {
		if (inputValue.length > 2) {
			searchResults = searchitems.filter((item: any) =>
				item.title.toLowerCase().includes(inputValue.toLowerCase())
			);
		} else {
			searchResults = [];
		}
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		inputValue = '';
		isFocused = false;
	}

	function closeWindow() {
		resultsWindow = false;
	}

	$: if (searchResults.length > 0) {
		resultsWindow = true;
	} else {
		resultsWindow = false;
	}

    function handleCloseClick() {
        hideDrawer();
    }

	onMount(async () => {
		posts = await allPosts();
	});

</script>

<form>
	<input
		type="text"
		placeholder="Search..."
		bind:value={inputValue}
		bind:this={inputElement}
		on:blur={handleBlur}
		on:input={handleInput}
		on:focus={handleFocus}
	/>
</form>

{#if searchResults.length && resultsWindow}
	
	<div class="rta-column rowgap100 null p-top-32">
		{#each searchResults as result}
		<p class="tt-c white" on:click={handleCloseClick} on:keydown={handleCloseClick}>
            <a href={result.url}>
			    {result.title}
            </a>
		</p>
		{/each}
	</div>
{/if}


<style lang="sass">

form
    input
        width: 100%
        padding: 6px
        border-radius: 8px
        border: none

</style>