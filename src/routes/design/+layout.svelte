<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { allBuild } from '$lib/utils/localpulls';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		toggleVisibility
	} from '$lib/stores/globalstores';
	import { slide } from 'svelte/transition';
	import Menu from '$lib/design/iconset/menu.svelte';
	import Moon from '$lib/design/iconset/moon.svelte';
	import Sun from '$lib/design/iconset/sun.svelte';
	import ArrowLeft from '$lib/design/iconset/arrowleft.svelte';
	import Acco1 from '$lib/design/MandAccordionItem.svelte';
	let openB = true;
	let fake = false;
	let builds: any;
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
	<div class="openmenu null" class:isShown={openB}>
		{#if $page.data.session}
			<div class="authorizedbox rta-column">
				<button class="blank-button rta-column" on:click={() => toggleOpenAcco(1)}>
					<Acco1 rotated={openAcco[1]}
						>Rough Drafts
						<div class="rta-column rowgap100" slot="body">
							{#if builds && builds.length > 0}
								{#each builds as item, i}
									<p>{item.meta.title}</p>
								{/each}
							{/if}
						</div>
					</Acco1>
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

<style lang="sass">

.light
	.login-box
		input[type=password], input[type=email]
			border: 1px solid #e7e7e7
			font-family: 'AuthenticSans-90', sans-serif
			padding: 4px 8px
			font-size: 12px
			border-radius: 4px
		button
			border: 1px solid #14BB4D
			background: #14BB4D
			padding: 4px 16px
			border-radius: 4px
			font-size: 12px
			max-width: 160px
			width: max-content
			cursor: pointer
			transform-origin: center center
			transition: 0.05s
			color: white
			font-family: 'AuthenticSans-90', sans-serif
			&:hover
				transform: scale(0.96)
			&:active
				background: #09A23D

.rta-sitebox
	min-height: 100vh
	box-sizing: border-box
	display: flex
	.appmenu
		z-index: 1000

.levelzero
	flex-direction: row
	.appmenu
		width: 64px
		display: flex
		flex-direction: column
		height: 100vh
		position: sticky
		top: 0
		left: 0
		padding-top: 32px
		row-gap: 16px
		&::after
			position: absolute
			top: 0
			right: 0
			width: 1px
			height: 100%
			content: ''
	.openmenu
		width: 280px
		transform: translateX(-344px)
		transition: 0.2s
		padding-left: 24px
		padding-right: 24px
		padding-top: 32px
	.openmenu.isShown
		transform: translateX(0)
	.pagearea
		width: calc(100% - 344px)

.darkmode
	background-color: hsla(14,0%,7%,1)
	background-image: radial-gradient(at 1% 29%, hsla(128,54%,13%,1) 0px, transparent 50%), radial-gradient(at 70% 61%, hsla(145,61%,8%,1) 0px, transparent 50%)
	.appmenu
		background: rgb(255,255,255)
		background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 47%, rgba(255,255,255,0) 100%)

.lightmode
	.appmenu
		background: #202020
	.openmenu
		border-right: 1px solid #e7e7e7

:root
	--lighter: #003554
	--darker: #051923


</style>
