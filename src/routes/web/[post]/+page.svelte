<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import Copy from '$lib/icons/Copy.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import ChevFRight from '$lib/icons/ChevFRight.svelte';
	import ChevFLeft from '$lib/icons/ChevFLeft.svelte';
	import ChevRight from '$lib/icons/ChevRight.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import { marked } from 'marked';
	import Prism from 'prismjs';
	import '$lib/utils/prismsql';
	import '$lib/styles/prism.css';

	export let data;

	let prevID: number;
	let nextID: number;
	let prevPost: any;
	let nextPost: any;
	let ttt: any;

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<GoodAlert />
<div
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<h4 class="bord-bot p-bot-16" style="margin: 0">{data.title}</h4>
	<div class="grot p-top-32 especial">
		<svelte:component this={data.content} />
	</div>
</div>
