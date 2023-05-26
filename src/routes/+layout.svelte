<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { LayoutData } from './$types';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		windowWidth,
		scrollY
	} from '$lib/stores/globalstores';
	import '$lib/styles/theme.sass';
	import '$lib/styles/typography.sass';
	import { slide } from 'svelte/transition';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import SideTrans from '$lib/components/SidebarTransition.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import NewNote from '$lib/components/NewNote.svelte';
	import { showDrawer, hideDrawer, audioStore } from '$lib/stores/modalstores';
	import Drawer from '$lib/components/Drawer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Search from '$lib/icons/Search.svelte';
	import Dark from '$lib/icons/DarkMode.svelte';
	import Menu from '$lib/icons/Menu.svelte';
	import '$lib/styles/animate.css';
	import Motif from '$lib/assets/Loader.svelte';

	let timeIs = false;
	let audioElement: any;
	let mobileMenu = false;
	let fake = false;

	$: ({ supabase, session } = data);

	function fauxfake() {
		fake = !fake;
	}

	function toggleMenu() {
		mobileMenu = !mobileMenu;
	}

	function toggleDrawer() {
		if (timeIs === false) {
			showDrawer();
			timeIs = !timeIs;
		} else {
			hideDrawer();
			timeIs = !timeIs;
		}
	}

	function theShift() {
		timeIs = !timeIs;
		showDrawer();
	}

	function signout() {
		supabase.auth.signOut();
	}

	onMount(() => {

		audioElement = new Audio('/sounds/boing2.mp3');
		audioStore.set(audioElement);

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});


	export let data: LayoutData;
</script>

<svelte:window bind:outerWidth={$windowWidth} bind:scrollY={$scrollY} />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
	<!-- Google tag (gtag.js) -->
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JFGGCTBC9"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-1JFGGCTBC9');
	</script>
</svelte:head>

<div
	class="project-shell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<section class="menubar rta-row stay between ycenter colgap200">

		<div class="rta-row logobox">
			<a href="/">
				<Motif />
			</a>
		</div>

		<div class="rta-row buttonsrow ycenter null">
			{#if $breakZero || $breakOne || mobileMenu}
				<div
					class="rta-row colgap300 row-col barlinks"
					transition:slide
					on:click={toggleMenu}
					on:keydown={fauxfake}
					>
					<p><a class="hover" href="/bot">Bot</a></p>
					<p><a class="hover" href="/word">Word</a></p>
					<p><a class="hover" href="/code">Code</a></p>
					<p><a href="/sound" class="hover">Sound</a></p>
					<p><a class="hover" href="/image">Image</a></p>
					<p><a href="/video" class="hover">Video</a></p>
					<p><a href="/build" class="hover">Build</a></p>
				</div>
			{/if}
			<div on:click={toggleDrawer} on:keydown={fauxfake}>
				<Search />
			</div>
			<Dark />
			{#if $breakTwo}
				<button class="blank-button" on:click={toggleMenu}>
					<Menu />
				</button>
			{/if}
			{#if session}
				<button class="mainbutton" on:click={signout}>Sign out</button>
			{/if}
		</div>


	</section>
	<section class="pagearea">
		{#key data.pathname}
			<TransitionPage>
				<slot />
			</TransitionPage>
		{/key}
		<audio src="/sounds/boing2.mp3" />
	</section>
	<NewNote />
	<Modal />
	<Drawer />
	<Toast />
	<Alert />
	<Chip />
</div>

<style lang="sass">

.project-shell.dark
    background-color: hsla(0,0%,8%,1)
    background-image: radial-gradient(at 57% 35%, hsla(108,80%,5%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(116,86%,5%,1) 0px, transparent 50%)

.project-shell.light
    background: white

p
    font-weight: 500

</style>
