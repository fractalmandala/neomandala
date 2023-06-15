<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage
	} from '$lib/stores/globalstores';
	import Social from '$lib/components/SocialShare.svelte';
	import { page } from '$app/stores';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Prism from 'prismjs';
	import '$lib/utils/prismsql';
	import '$lib/styles/prism.css';
	import '$lib/styles/tiptap.sass';

	export let data;

	$pageTitle = data.title;
	$pageDescription = data.description;
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
	$pageUrl = 'https://www.fractalmandala.in' + $page.url.pathname;

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
		<h3 class="ta-c tt-u bord-bot p-bot-32">{data.title}</h3>
		<div class="rta-row">
			<small><span style="color: #10D56C">{data.type}</span> | {data.tags}</small>
		</div>
		<Social />
	</div>
	<div class="rta-column x101 p-top-32">
		<div class="blogger">
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
	@media screen and (max-width: 768px)
		width: calc(100vw - 16px)


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
