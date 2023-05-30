<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Github from '$lib/icons/Github.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import type { LayoutData } from './$types';
	import FMLogo from '$lib/assets/FMLogo.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MenuDrop from '$lib/components/MenuDrop.svelte';
	import CharsAligned from '$lib/assets/CharsAligned.svelte';
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
	import '$lib/styles/design.sass';
	import { slide } from 'svelte/transition';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import { showDrawer, hideDrawer, audioStore, footerStore } from '$lib/stores/modalstores';
	import Drawer from '$lib/components/Drawer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import GoodAlert from '$lib/components/GoodAlert.svelte';
	import Search from '$lib/icons/Search.svelte';
	import Dark from '$lib/icons/DarkMode.svelte';
	import Menu from '$lib/icons/Menu.svelte';
	import '$lib/styles/animate.css';
	import Pad from '$lib/icons/Pad.svelte';

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
	<section class="menubar rta-row stay between ycenter colgap200">
		<a href="/" class="rta-row ycenter logobox">
			<svg
				width="191"
				height="21"
				viewBox="0 0 191 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M64.954 21C63.257 21 61.7491 20.8017 60.4303 20.4051C59.1114 19.9994 57.9909 19.3768 57.0687 18.5375C56.1556 17.6891 55.4639 16.6054 54.9936 15.2865C54.5232 13.9677 54.288 12.3861 54.288 10.5415C54.288 8.19895 54.7122 6.24837 55.5607 4.68968C56.4093 3.12188 57.6451 1.95058 59.2683 1.17591C60.8915 0.392008 62.8605 0 65.1754 0C65.9593 0 66.7155 0.0415425 67.4441 0.124515C68.1728 0.198256 68.8828 0.318155 69.5745 0.484212V4.19174C68.929 4.03491 68.2696 3.91501 67.5964 3.83204C66.9322 3.74895 66.2452 3.70752 65.535 3.70752C64.0594 3.70752 62.8374 3.93809 61.869 4.39922C60.9099 4.85112 60.1905 5.57513 59.7109 6.57114C59.2313 7.56715 58.9915 8.87219 58.9915 10.4862C58.9915 12.1555 59.2267 13.4881 59.6971 14.4841C60.1767 15.471 60.8869 16.1858 61.8276 16.6285C62.7774 17.0711 63.9626 17.2925 65.3829 17.2925C66.0838 17.2925 66.7801 17.2371 67.4718 17.1264C68.1635 17.0065 68.8645 16.8452 69.5745 16.6423V20.336C68.9197 20.5389 68.1911 20.7002 67.3888 20.8201C66.5956 20.94 65.784 21 64.954 21Z"
					fill="url(#paint0_linear_22_39)"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M16.4102 20.7371V0.719394C17.028 0.581032 17.6875 0.461133 18.3885 0.359697C19.0893 0.24903 19.8133 0.166057 20.5604 0.110667C21.3073 0.0461583 22.0591 0.0138475 22.8153 0.0138475C25.7573 0.0138475 27.9707 0.548721 29.4556 1.61858C30.9405 2.67921 31.6828 4.33922 31.6828 6.59884C31.6828 8.05597 31.3324 9.27804 30.6314 10.2648C29.9305 11.2424 28.9299 11.9802 27.6295 12.4783L27.558 12.5055L33.1637 20.4441L39.6817 0.262877H46.2252L52.8379 20.7371H48.4109L46.7202 15.2728H39.1273L37.4406 20.7371H28.4595L23.2309 13.2238L23.1201 13.2248L23.0114 13.2253H22.9952C22.9074 13.2253 22.821 13.225 22.7361 13.2246C22.6492 13.2241 22.5639 13.2235 22.4801 13.2226C22.3932 13.2217 22.308 13.2204 22.2244 13.2189C22.1043 13.2169 21.9877 13.2144 21.8745 13.2114L21.449 13.1888L20.8231 13.1561V20.7371H16.4102ZM40.2333 11.6898H45.6115L42.9192 2.98836L40.2333 11.6898ZM23.0781 9.87743C24.563 9.87743 25.665 9.61928 26.3844 9.10275C27.1038 8.58634 27.4635 7.75167 27.4635 6.59884C27.4635 5.84251 27.3113 5.22467 27.007 4.74507C26.7026 4.25625 26.2414 3.89655 25.6236 3.66598C25.0056 3.43542 24.2217 3.32013 23.2718 3.32013C22.8014 3.32013 22.368 3.3386 21.9714 3.37552C21.5748 3.41234 21.1921 3.46773 20.8231 3.54147V9.76676C21.0906 9.78522 21.3397 9.8083 21.5702 9.836C21.81 9.85446 22.0498 9.86819 22.2896 9.87743H23.0781Z"
					fill="url(#paint1_linear_22_39)"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M105.958 3.37023L100.33 20.7371H93.7867L88.3648 3.99798H82.1761V20.7371H77.6662V3.99798H71.2057V0.262877H88.6227V0.27436H91.597L93.3016 5.77801H100.885L102.571 0.332002H181.345V17.0711H190.752V20.8062H176.849V3.29311H173.921V8.48232H166.971C166.189 8.48232 165.593 8.61911 165.182 8.89279C164.791 9.16636 164.595 9.51818 164.595 9.94824C164.595 10.1632 164.654 10.3978 164.771 10.6519C164.908 10.906 165.133 11.1503 165.446 11.3848L170.666 10.0362C171.722 10.3489 172.611 10.8179 173.335 11.4434C174.058 12.0493 174.606 12.7334 174.977 13.4957C175.349 14.2384 175.534 14.9909 175.534 15.7532C175.534 16.6522 175.29 17.4829 174.801 18.2451C174.312 19.0074 173.628 19.6132 172.748 20.0628C171.888 20.5123 170.862 20.7371 169.669 20.7371C168.535 20.7371 167.391 20.4928 166.238 20.0042C165.104 19.5351 163.97 18.763 162.836 17.6881C161.702 16.613 160.558 15.2254 159.405 13.5249L161.076 12.1471C162.191 13.9061 163.374 15.2059 164.625 16.0463C165.876 16.8671 167.147 17.2776 168.437 17.2776C169.082 17.2776 169.669 17.1799 170.197 16.9845C170.744 16.7694 171.194 16.4861 171.546 16.1342C171.917 15.7824 172.172 15.3915 172.308 14.9616C172.465 14.5315 172.484 14.082 172.367 13.6129L167.88 15.0495C166.629 14.7172 165.495 14.2188 164.478 13.5543C163.481 12.8898 162.689 12.1373 162.103 11.2968C161.516 10.4368 161.223 9.57683 161.223 8.71683C161.223 8.07185 161.399 7.47573 161.751 6.92847C162.122 6.36163 162.689 5.91209 163.452 5.57986C164.234 5.22805 165.221 5.05219 166.414 5.05219H170.343V3.29311H156.873L158.626 4.61234V10.2707C158.626 11.5412 158.431 12.5477 158.04 13.2904C157.668 14.0135 157.179 14.5315 156.573 14.8443C155.987 15.1374 155.351 15.284 154.667 15.284C153.924 15.284 153.152 15.1082 152.35 14.7564C151.549 14.4045 150.796 13.9256 150.092 13.3197C149.408 12.6943 148.851 12.0005 148.42 11.2382C148.01 10.4759 147.805 9.69414 147.805 8.89279V3.29311H142.531L144.284 4.61234V19.7111L143.14 20.2095L140.354 18.6556V13.1439H135.163V15.7532L133.521 16.6034C133.032 16.4079 132.504 16.1147 131.937 15.7238C131.39 15.3133 130.862 14.8541 130.353 14.3459C129.845 13.8181 129.386 13.2806 128.975 12.7334C128.584 12.1665 128.301 11.6193 128.125 11.0916L129.034 9.68435H131.288L131.022 3.29311H127.265L127.228 3.37023H122.128L123.924 4.72391V20.2156L122.752 20.727L119.869 19.1327V9.01494C119.391 9.1721 118.95 9.42631 118.547 9.77745C117.947 10.319 117.476 11.0308 117.136 11.9132C116.795 12.7756 116.605 13.7883 116.565 14.9515L115.574 15.523L112.6 13.5377C112.62 12.2268 112.856 11.1029 113.308 10.1657C113.193 10.0973 113.077 10.0381 112.961 9.98809C112.56 9.78747 112.15 9.68728 111.729 9.68728C111.069 9.68728 110.468 9.91784 109.927 10.3791C109.387 10.8403 109.116 11.5222 109.116 12.4247C109.116 13.1866 109.347 13.9287 109.807 14.6506C110.268 15.3526 110.908 16.0544 111.729 16.7564C112.57 17.4382 113.552 18.1401 114.673 18.862L113.111 20.9677C110.228 19.223 108.145 17.5184 106.864 15.8539C105.582 14.1694 104.941 12.5349 104.941 10.9507C104.941 9.8477 105.182 8.92521 105.662 8.18319C106.163 7.44117 106.794 6.87973 107.555 6.49864C108.315 6.11766 109.086 5.92706 109.867 5.92706C110.208 5.92706 110.548 5.96725 110.888 6.04741C111.229 6.12768 111.539 6.2379 111.82 6.37829L114.305 8.64928C114.573 8.34047 114.866 8.06476 115.184 7.82226C115.964 7.24066 116.815 6.83953 117.737 6.61899C118.442 6.4348 119.152 6.35037 119.869 6.36591V3.37023H105.958ZM97.093 18.02L94.4075 9.34886H99.7785L97.093 18.02ZM149.933 3.29311L151.588 4.61234V11.6779C151.783 11.932 152.057 12.1177 152.409 12.235C152.761 12.3523 153.113 12.3718 153.465 12.2936C153.836 12.2154 154.149 12.02 154.403 11.7073C154.657 11.375 154.784 10.906 154.784 10.3001V3.29311H149.933ZM140.354 9.68435H135.058L134.987 4.61234L133.234 3.29311H140.354V9.68435Z"
					fill="url(#paint2_linear_22_39)"
				/>
				<path
					d="M14.332 20.7371V0.262877H0V3.92886H9.836V8.90911H1.41109V12.5751H9.836V20.7371H14.332Z"
					fill="url(#paint3_linear_22_39)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_22_39"
						x1="95.3761"
						y1="0"
						x2="95.3761"
						y2="21"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#20E27B" />
						<stop offset="1" stop-color="#04A932" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_22_39"
						x1="95.3761"
						y1="0"
						x2="95.3761"
						y2="21"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#20E27B" />
						<stop offset="1" stop-color="#04A932" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_22_39"
						x1="95.3761"
						y1="0"
						x2="95.3761"
						y2="21"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#20E27B" />
						<stop offset="1" stop-color="#04A932" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_22_39"
						x1="95.3761"
						y1="0"
						x2="95.3761"
						y2="21"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#20E27B" />
						<stop offset="1" stop-color="#04A932" />
					</linearGradient>
				</defs>
			</svg>
		</a>

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
	<Modal />
	<Drawer />
	<Toast />
	<Alert />
	<GoodAlert />
	<Chip />
</div>

<style lang="sass">

.menubar
    z-index: 1000

.project-shell
    max-width: 100vw

.project-shell.dark
    background-color: hsla(0,0%,8%,1)
    background-image: radial-gradient(at 57% 35%, hsla(108,80%,5%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(116,86%,5%,1) 0px, transparent 50%)

.project-shell.light
    background: white

.logobox
    justify-content: flex-start
//footer
//    background: transparent
//    a
//        color: #0ca64c

</style>
