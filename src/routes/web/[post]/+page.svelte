<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import Social from '$lib/components/SocialShare.svelte';
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
	import '$lib/styles/tiptap.sass';

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
	<div class="thisguy rta-column xcenter ycenter null p-top-64 rowgap100 grot">
		<h1 class="ta-c tt-u bord-bot p-bot-32">{data.title}</h1>
		<Social />
	</div>
	<div class="rta-column x101 p-top-32">
		<div class="blogger p-bot-32">
			<svelte:component this={data.content} />
		</div>
	</div>
</div>

<style lang="sass">


.x101
	align-items: center


.leveltwo
	.blogger
		padding-left: 32px
		padding-right: 32px

.blogger
	@media screen and (min-width: 769px)
		width: 720px
		padding-left: 40px
		padding-right: 40px
		padding-top: 64px


.thisguy
	background: var(--this)

.levelzero
	.thisguy
		padding-left: 40px
		padding-right: 40px

.leveltwo
	.thisguy
		padding-left: 16px
		padding-right: 16px

</style>
