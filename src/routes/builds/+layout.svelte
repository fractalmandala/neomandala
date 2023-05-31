<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allBuild, allWebdev } from '$lib/utils/localpulls';
	import { slide } from 'svelte/transition';
	import { snippets } from '$lib/dash/db';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		toggleVisibility
	} from '$lib/stores/globalstores';
	import Loader from '$lib/assets/Loader.svelte';
	import Pinned from '$lib/dash/PinnedNotes.svelte';
	import Auth from '$lib/dash/AuthHeader.svelte';
	import Menu from '$lib/design/iconset/menu.svelte';
	import Moon from '$lib/design/iconset/moon.svelte';
	import Sun from '$lib/design/iconset/sun.svelte';
	import ArrowLeft from '$lib/design/iconset/arrowleft.svelte';
	import Acco1 from '$lib/design/MandAccordionItem.svelte';
	import Acco2 from '$lib/design/MandAccordionItem.svelte';
	import Acco3 from '$lib/design/MandAccordionItem.svelte';
	import Acco4 from '$lib/design/MandAccordionItem.svelte';
	let openB = true;
	let fake = false;
	let builds: any;
	let webs: any;
	let snips: any;
	let openAcco = Array(4).fill(false);
	let buildOpen = Array(10).fill(false);
	let axis: 'x' | 'y' | undefined;
	let dimension: number;

	function toggleOpenAcco(index: number) {
		openAcco[index] = !openAcco[index];
		for (let i = 0; i < openAcco.length; i++) {
			if (i !== index && openAcco[i] === true) {
				openAcco[i] = false;
			}
		}
	}

	function toggleBuildOpen(index: number) {
		buildOpen[index] = !buildOpen[index];
		for (let i = 0; i < buildOpen.length; i++) {
			if (i !== index && buildOpen[i] === true) {
				buildOpen[i] = false;
			}
		}
	}

	function fauxfake() {
		fake = !fake;
	}

	function toggleBar() {
		openB = !openB;
	}

	function handleModeChange() {
		toggleVisibility();
	}

	$: if ($breakTwo) {
		axis = 'y';
		dimension = 24;
	} else {
		axis = 'x';
		dimension = 20;
	}

	onMount(() => {
		(async () => {
			builds = await allBuild();
			webs = await allWebdev();
			snips = await snippets();
		})();
	});
</script>

<div
	class="rta-sitebox"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	class:calib={openB}
>
	<div class="moving-side">
		<div class="appmenu">
			<a href="/" class="rta-row xcenter-d ycenter">
				<Loader color={'#10D56C'} {dimension} />
			</a>
			<button class="blank-button" on:click={toggleBar}>
				{#if openB}
					<ArrowLeft color={'#FFFFFF'} {dimension} />
				{:else}
					<Menu color={'#FFFFFF'} {dimension} />
				{/if}
			</button>
			<button class="blank-button" on:click={handleModeChange}>
				{#if $themeMode}
					<Moon color={'#FFFFFF'} {dimension} />
				{:else}
					<Sun color={'#FFFFFF'} {dimension} />
				{/if}
			</button>
		</div>
	</div>
	<div class="moving-page">
		<div class="pagearea">
			<div class="inpage-page">
				<slot />
			</div>
		</div>
	</div>
</div>
