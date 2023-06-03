<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { mouseStore } from '$lib/stores/mousestore';
	import { spring } from 'svelte/motion';
	import Logout from '$lib/design/iconset/logout.svelte';
	import Login from '$lib/design/iconset/login.svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		windowWidth,
		scrollY
	} from '$lib/stores/globalstores';
	import '$lib/styles/theme.sass';
	import '$lib/styles/fonts.sass';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import AlertNew from '$lib/dash/Alert.svelte';
	import { showDrawer, hideDrawer } from '$lib/stores/modalstores';
	import GlobalNote from '$lib/dash/globals/GlobalNote.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import '$lib/styles/animate.css';

	let pageTitle = '';

	let timeIs = false;
	let audioElement: any;
	let mobileMenu = false;
	let fake = false;
	let hideHeader = false;
	let okayCol = false;
	const position = mouseStore();
	let logged: boolean;

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);

	$: ({ supabase, session } = data);

	$: if (session) {
		logged = true;
	} else {
		logged = false;
	}

	function signout() {
		supabase.auth.signOut();
	}

	onMount(() => {
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
	let linku = '';
	export let data: LayoutData;

	$: linku = data.pathname.slice(0, 4);
	$: pageTitle = $page.url.pathname.slice(1, 4);

	$: if ($scrollY > 1200) {
		okayCol = true;
	} else {
		okayCol = false;
	}
</script>

<svelte:window bind:outerWidth={$windowWidth} bind:scrollY={$scrollY} />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
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
	class="minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if $themeMode}
		<div class="backs whiteback" />
	{:else}
		<div class="backs blackback" />
	{/if}
	<header>
		<Header {logged} {pageTitle}>
			<div slot="logger">
				{#if session}
					<button class="blank-button" on:click={signout}>
						<Logout />
					</button>
				{:else}
					<a class="blank-button" href="/login">
						<Login />
					</a>
				{/if}
			</div>
		</Header>
	</header>
	<main class="low">
		<slot />
	</main>
</div>
<AlertNew />
<Modal />
<Drawer />
<Toast />
<Alert />
<GoodAlert />
<Chip />
<GlobalNote />

<style lang="sass">

.minH
	position: relative
	.backs
		position: absolute
		top: 0
		right: 0
		width: 100%
		height: 100%
		transform-origin: top

header
	z-index: 1000
	margin-bottom: -56px
	position: sticky
	top: 0
	backdrop-filter: blur(2px)

.low
	z-index: 0

.minH.light
	background: #FFFFFF

.minH.dark
	background: #171717

//footer
//	background: transparent
//	a
//		color: #0ca64c

</style>
