<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import Footer from '$lib/components/Footer.svelte';
	import MenuDrop from '$lib/components/MenuDrop.svelte';
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
	import '$lib/styles/fonts.sass';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import AlertNew from '$lib/dash/Alert.svelte';
	import { showDrawer, hideDrawer, audioStore } from '$lib/stores/modalstores';
	import GlobalNote from '$lib/dash/globals/GlobalNote.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Search from '$lib/icons/Search.svelte';
	import Dark from '$lib/icons/DarkMode.svelte';
	import Menu from '$lib/icons/Menu.svelte';
	import '$lib/styles/animate.css';

	let timeIs = false;
	let audioElement: any;
	let mobileMenu = false;
	let fake = false;
	let hideHeader = false;
	let okayCol = false;

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
	let linku = '';
	export let data: LayoutData;

	$: linku = data.pathname.slice(0, 4);

	$: if (
		linku === '/pad' ||
		linku === '/web' ||
		linku === '/bui' ||
		linku === '/pro' ||
		linku === '/cod' ||
		linku === '/log'
	) {
		hideHeader = true;
	} else {
		hideHeader = false;
	}

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
	class="project-shell minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if !hideHeader}
		<section class="menubar rta-row stay between ycenter colgap200" class:okaycolor={okayCol}>
			<a href="/" class="rta-row gradienter ycenter logobox"> FRACTALMAṆḌALA </a>

			<div class="rta-row buttonsrow ycenter null">
				<div on:click={toggleDrawer} on:keydown={fauxfake}>
					<Search />
				</div>
				<Dark />
				{#if $breakTwo}
					<button class="blank-button" on:click={toggleMenu}>
						<Menu />
					</button>
				{/if}
				<MenuDrop>
					<button slot="link1" class="blank-button menulinks" on:click={signout}> Log Out </button>
				</MenuDrop>
			</div>
		</section>
	{/if}
	<section class="pagearea">
		{#key data.pathname}
			<TransitionPage>
				<slot />
			</TransitionPage>
		{/key}
		<audio src="/sounds/boing2.mp3" />
	</section>
	<Footer />
	<!--
	{#if $footerMode}
		<section class="footer glass-top">
			<footer class="rta-column rowgap100 xcenter p-top-16 p-bot-8 null padding-l0">
				<small class="ta-c grey">
					I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
						href="https://www.brhat.in"
						target="_blank"
						rel="noreferrer">Bṛhat</a
					>, a cultural content, research and learning organization. Apart from this site, I also
					develop and maintain Bṛhat's website and the sister portal
					<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer"
						>Bṛhat Education.</a
					>
				</small>
				<div class="rta-row grey">
					<Github />
					<Twitter />
				</div>
			</footer>
		</section>
	{/if}
	-->
	<AlertNew />
	<Modal />
	<Drawer />
	<Toast />
	<Alert />
	<GoodAlert />
	<Chip />
	<GlobalNote />
</div>

<style lang="sass">

.menubar
	z-index: 1000

.project-shell
	max-width: 100vw

.project-shell.dark
	background-color: hsla(0,0%,8%,1)
	background-image: radial-gradient(at 57% 35%, hsla(108,80%,5%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(116,86%,5%,1) 0px, transparent 50%)
	.okaycolor
		background-color: hsla(0,0%,8%,1)

.project-shell.light
	background: white
	.okaycolor
		background: white

.logobox
	justify-content: flex-start
	font-weight: bold
	font-family: 'Authentic Sans', sans-serif
	letter-spacing: -0.5px
	font-size: 20px
//footer
//	background: transparent
//	a
//		color: #0ca64c

</style>
