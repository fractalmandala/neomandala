<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';
	import Pinned from '$lib/dash/PinnedNotes.svelte';
	import type { LayoutData } from './$types';
	import type { ActionData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AuthModal from '$lib/components/AuthModal.svelte';
	import { spring } from 'svelte/motion';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		windowWidth,
		scrollY,
		pageImage,
		pageTitle,
		pageDescription,
		pageUrl,
		shareImage,
		showAuth,
		authState
	} from '$lib/stores/globalstores';
	import '$lib/styles/theme.sass';
	import '$lib/styles/fonts.sass';
	import Modal from '$lib/components/Modal.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import AlertNew from '$lib/dash/Alert.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Transition from '$lib/components/TransitionPage.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import '$lib/styles/animate.css';
	export let form: ActionData;
	export let data: LayoutData;
	let okayCol = false;
	let logged: boolean;

	$: ({ supabase, session } = data);

	$: if (data.session && data.session.user.aud === 'authenticated') {
		logged = true;
		$authState = true;
	} else {
		logged = false;
		$authState = false;
	}

	function toggleLogout() {
		showAuth(true);
	}

	function toggleLogin() {
		showAuth(false);
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

	$: linku = data.pathname.slice(0, 4);

	$: if ($scrollY > 1200) {
		okayCol = true;
	} else {
		okayCol = false;
	}
</script>

<svelte:window bind:outerWidth={$windowWidth} bind:scrollY={$scrollY} />

<svelte:head>
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

<Sidebar logger={logged}>
	<div
		class="rta-row ycenter"
		slot="autharea"
		class:lightside={$themeMode}
		class:darkside={!$themeMode}
	>
		{#if $authState}
			<button class="blank-button xc" on:click={toggleLogout}>Logout</button>
		{:else}
			<button class="blank-button xc" on:click={toggleLogin}>Login</button>
		{/if}
	</div>
</Sidebar>
<div
	class="cover"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<header>
		<Header logger={logged} />
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
<Toast />
<Alert />
<GoodAlert />
<Chip />
<Pinned />
<AuthModal {form} />

<style lang="sass">

.lightside
	.xc
		color: #d7d7d7
		&:hover
			color: #272727

.darkside
	.xc
		color: #313131
		&:hover
			color: white

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

.cover
	background-position: top left
	background-repeat: no-repeat
	background-size: 100vw 100vh

</style>
