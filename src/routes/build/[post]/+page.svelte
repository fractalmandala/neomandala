<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';
	import Prism from 'prismjs';
	import '$lib/styles/prismextras.css';
	import '$lib/styles/prismtwo.css';
	export let data;

	onMount(async () => {
		Prism.highlightAll();
	});
</script>

<div
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<h2 class="noh ta-c">{data.title}</h2>

	<div class="thisispost">
		<svelte:component this={data.content} />
	</div>
</div>
