<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';
	import Pinned from '$lib/dash/PinnedNotes.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
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
	import Modal from '$lib/components/Modal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import AlertNew from '$lib/dash/Alert.svelte';
	import GlobalNote from '$lib/dash/globals/GlobalNote.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Transition from '$lib/components/TransitionPage.svelte';
	import '$lib/styles/animate.css';

	let pageTitle = '';

	let okayCol = false;
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
		const lenis = new Lenis({
			duration: 1.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			easing: (t: number): number => {
				return 1 - Math.pow(1 - t, 5);
			},
			smoothWheel: true,
			wheelMultiplier: 0.5,
			smoothTouch: false,
			touchMultiplier: 0,
			infinite: false
		});

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

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
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<header>
		<Header {logged} {pageTitle} />
	</header>
	<main class="low minH">
		{#key data.pathname}
			<Transition>
				<slot />
			</Transition>
		{/key}
	</main>
	<footer>
		<Footer />
	</footer>
</div>
<AlertNew />
<Modal />
<Drawer />
<Toast />
<Alert />
<GoodAlert />
<Chip />
<GlobalNote />
<Pinned />

<style lang="sass">


header
	z-index: 1000
	margin-bottom: -56px
	position: sticky
	top: 0
	backdrop-filter: blur(2px)

.low
	z-index: 0
	margin-top: 56px


.light
	background: #FFFFFF

.dark
	background: #171717

//footer
//	background: transparent
//	a
//		color: #0ca64c

</style>
