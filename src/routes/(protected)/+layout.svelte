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
		{#if openB}
			<div class="openmenu null" data-lenis-prevent in:slide={{ axis: axis }}>
				{#if $page.data.session}
					<div class="authorizedbox rta-column">
						<button class="blank-button rta-column" on:click={() => toggleOpenAcco(1)}>
							<Acco1 rotated={openAcco[1]}
								>Rough Drafts
								<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
									{#if builds && builds.length > 0}
										{#each builds as item, i}
											<p class="grot">
												<a href={item.linkpath} class="hover">
													{item.meta.title}
												</a>
											</p>
										{/each}
									{/if}
								</div>
							</Acco1>
						</button>
						<button class="blank-button rta-column p-top-16" on:click={() => toggleOpenAcco(2)}>
							<Acco2 rotated={openAcco[2]}
								>Web Dev Posts
								<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
									{#if webs && webs.length > 0}
										{#each webs as item, i}
											<p class="grot">
												<a href={item.linkpath} class="hover">
													{item.meta.title}
												</a>
											</p>
										{/each}
									{/if}
								</div>
							</Acco2>
						</button>
						<button class="blank-button rta-column p-top-16" on:click={() => toggleOpenAcco(3)}>
							<Acco3 rotated={openAcco[3]}>
								Code Snippets
								<div class="rta-column rowgap50 bord-bot p-bot-16" slot="body">
									{#if snips && snips.length > 0}
										{#each snips as item}
											<p class="grot">
												<a href="/code/{item.id}" class="hover">
													{item.title}
												</a>
											</p>
										{/each}
									{/if}
								</div>
							</Acco3>
						</button>
					</div>
				{:else}
					<div class="login-box">
						<form class="rta-column rowgap50">
							<input type="email" placeholder="email" />
							<input type="password" placeholder="password" />
							<button type="submit">Login</button>
						</form>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="moving-page">
		<Auth>
			<div slot="signout">
				<button class="blank-button">
					<small class="green tt-u grot">Log out</small>
				</button>
			</div>
		</Auth>
		<div class="pagearea">
			<div class="inpage-page">
				<slot />
			</div>
			<div class="the-rightbar">
				<Pinned />
			</div>
		</div>
	</div>
</div>
