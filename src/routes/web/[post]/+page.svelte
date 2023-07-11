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
		shareImage,
		noteName,
		showSave,
		hideSave
	} from '$lib/stores/globalstores';
	import Social from '$lib/components/SocialShare.svelte';
	import { page } from '$app/stores';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Prism from 'prismjs';
	import '$lib/utils/prismsql';
	import '$lib/styles/prism.css';
	import '$lib/styles/tiptap.sass';

	export let data;

	let fuller = data.type + ' | ' + data.tags;

	$: if (data) {
		$noteName = data.title;
		showSave(fuller);
	}

	$pageTitle = data.title;
	$pageDescription = data.description;
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
	$pageUrl = 'https://www.fractalmandala.in' + $page.url.pathname;

	onMount(() => {
		$noteName = data.title;
		Prism.highlightAll();
	});

	onDestroy(() => {
		$noteName = '';
		hideSave();
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
	<div class="thisguy rta-column xcenter ycenter null rowgap100 grot">
		<Social />
	</div>
	<div class="rta-column x101">
		<div class="rta-column fullW">
			<h1>{data.title}</h1>
			<small>{data.description}</small>
			<small class="cappy">{data.type} | {data.tags}</small>
		</div>
		<div class="blogger">
			<svelte:component this={data.content} />
		</div>
	</div>
</div>

<style lang="sass">

.cappy
	text-transform: uppercase
	font-size: 10px
	letter-spacing: 2px
	border-top: 1px solid var(--contraster)
	padding-top: 8px
	margin-top: 8px
	color: #10D56C

small
	color: var(--texttwo)
	letter-spacing: 2px
	font-weight: 700


.x101
	align-items: center
	padding-top: 64px
	padding-bottom: 64px
	.fullW
		padding-bottom: 64px
	@media screen and (max-width: 1023px)
		padding-left: 24px
		padding-right: 24px
		padding-top: 0
		.fullW
			padding-bottom: 32px


.leveltwo
	.blogger
		padding-left: 32px
		padding-right: 32px

.blogger
	@media screen and (min-width: 769px)
		width: 720px
		padding-left: 40px
		padding-right: 40px
	@media screen and (max-width: 768px)
		width: 100%

h1
	@media screen and (min-width: 1024px)
		font-size: 48px

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
