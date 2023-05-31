<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allBuild, allWebdev } from '$lib/utils/localpulls';
	import { snippets } from '$lib/dash/db';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		toggleVisibility
	} from '$lib/stores/globalstores';
	import Loader from '$lib/assets/Loader.svelte';
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

	onMount(async () => {
		builds = await allBuild();
		webs = await allWebdev();
		snips = await snippets();
	});
</script>

<div
	class="rta-sitebox"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
>
	<div class="appmenu">
		<a href="/" class="rta-row xcenter-d ycenter">
			<Loader color={'#10D56C'} />
		</a>
		<button class="blank-button" on:click={toggleBar}>
			{#if openB}
				<ArrowLeft color={'#FFFFFF'} dimension={20} />
			{:else}
				<Menu color={'#FFFFFF'} dimension={20} />
			{/if}
		</button>
		<button class="blank-button" on:click={handleModeChange}>
			{#if $themeMode}
				<Moon color={'#FFFFFF'} dimension={20} />
			{:else}
				<Sun color={'#FFFFFF'} dimension={20} />
			{/if}
		</button>
	</div>
	<div class="openmenu null" class:isShown={openB} data-lenis-prevent>
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
	<div class="pagearea">
		<slot />
	</div>
</div>
