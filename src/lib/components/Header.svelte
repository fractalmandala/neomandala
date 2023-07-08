<script lang="ts">
	import { browser } from '$app/environment';
	import Motif from '$lib/assets/Motif.svelte';
	import {
		themeMode,
		breakZero,
		breakOne,
		breakTwo,
		pageTitle,
		toggleSide,
		noteName,
		headTitle
	} from '$lib/stores/globalstores';
	import SaveModal from '$lib/components/SaveModal.svelte';
	import { slide } from 'svelte/transition';
	import Moon from '$lib/design/iconset/moon.svelte';
	import Sun from '$lib/design/iconset/sun.svelte';
	import Side from '$lib/design/iconset/sidebar.svelte';
	import Add from '$lib/design/iconset/add.svelte';
	import Pin from '$lib/design/iconset/chevrondown.svelte';
	import { showPinned, hidePinned } from '$lib/dash/modalstores';

	let dimension = 16;
	let color = 'var(--background)';
	let menuNav = false;
	let fake = false;
	let dropped = false;
	export let logger: boolean;

	let link1 = 'pad';
	let link2 = 'cod';
	let link3 = 'wor';
	let link4 = 'ima';
	let link5 = 'sou';
	let link6 = 'vid';
	let link7 = 'bot';
	let link8 = 'kno';

	let greener1 = false;
	let greener2 = false;
	let greener3 = false;
	let greener4 = false;
	let greener5 = false;
	let greener6 = false;
	let greener7 = false;
	let greener8 = false;

	$: if ($pageTitle === link1) {
		greener1 = true;
	} else greener1 = false;

	$: if ($pageTitle === link2) {
		greener2 = true;
	} else greener2 = false;

	$: if ($pageTitle === link3) {
		greener3 = true;
	} else greener3 = false;

	$: if ($pageTitle === link4) {
		greener4 = true;
	} else greener4 = false;

	$: if ($pageTitle === link5) {
		greener5 = true;
	} else greener5 = false;

	$: if ($pageTitle === link6) {
		greener6 = true;
	} else greener6 = false;

	$: if ($pageTitle === link7) {
		greener7 = true;
	} else greener7 = false;

	$: if ($pageTitle === link8) {
		greener8 = true;
	} else greener8 = false;

	function toggleDrop() {
		dropped = !dropped;
	}

	function handleClick() {
		toggleSide();
	}

	function toggleMenuNav() {
		menuNav = !menuNav;
	}

	function fauxfake() {
		fake = !fake;
	}

	function closeHelper() {
		if (dropped === true) {
			dropped = false;
		}
	}

	function handleSwitch() {
		if (browser) {
			themeMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('themeMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

	let text = 'FRACTALMAṆḌALA';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fm-header"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	on:mouseleave={closeHelper}
>
	<div class="rta-row colgap200">
		<Motif />
		<a href="/" class="logo">
			{#each text.split('') as char, i}
				<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
			{/each}
		</a>
	</div>
	<div class="conditional rta-row between">
		<div class="notename">{$noteName}</div>
	</div>
	<div class="rta-row ycenter outrow">
		{#if !$breakTwo && logger}
			{#if $headTitle === 'notes'}
				<div class="thispage">Notes</div>
			{:else}
				<a class="loner" href="/notes">N</a>
			{/if}
			{#if $headTitle === 'thea'}
				<div class="thispage">Thea</div>
			{:else}
				<a class="loner" href="/thea"> T </a>
			{/if}
			{#if $headTitle === 'janapada'}
				<div class="thispage">Janapada</div>
			{:else}
				<a class="loner" href="/janapada">J</a>
			{/if}
			{#if $headTitle === 'ui'}
				<div class="thispage">UI</div>
			{:else}
				<a class="loner" href="/uicomp">U</a>
			{/if}
		{/if}
		<div class="rta-row colgap200 ycenter outinrow">
			<button class="blank-button" on:click={handleSwitch}>
				{#if $themeMode}
					<Moon {dimension} {color} />
				{:else}
					<Sun {dimension} {color} />
				{/if}
			</button>
			<button class="blank-button" on:click={handleClick}>
				<Side />
			</button>
		</div>
	</div>
</div>

<style lang="sass">

.thispage
	font-size: 14px
	text-transform: uppercase
	background: #10D56C
	padding: 3px 6px
	border-radius: 2px
	color: white

.levelone, .levelzero
	.loner
		border-right: 1px solid var(--contraster)
		padding-right: 16px
		padding-left: 16px
		text-align: center
	.outinrow
		margin-left: 16px
		height: 100%
		padding-top: 4px

.leveltwo
	.loner
		border-right: 1px solid var(--contraster)
		padding-right: 8px
		padding-left: 8px
		text-align: center
	.outinrow
		margin-left: 8px
		padding-top: 4px

.notename
	font-size: 20px
	text-transform: uppercase
	color: var(--texttwo)

.outrow
	a
		font-size: 14px
		&:hover
			color: #10D56C

.logo
	cursor: pointer
	&:hover
		.text-animation
			animation: colorchange 1s infinite forwards

@keyframes colorchange
	0%
		color: var(--texttwo)
	20%
		color: #CF2C2C
	30%
		color: #C22DCF
	40%
		color: #3A93E5
	50%
		color: #10D56C
	60%
		color: #71C331
	70%
		color: #F0F418
	80%
		color: #BEC118
	90%
		color: #10D56C
	100%
		color: var(--texttwo)

.rta-row
	z-index: 1000

.fm-header
	display: flex
	flex-direction: row
	justify-content: space-between
	width: 100%
	height: 40px
	align-items: center
	z-index: 1000

.fm-header.darkmode
	background: #171717
	border-bottom: 1px solid var(--contraster)

.fm-header.lightmode
	background: #FFFFFF
	border-bottom: 1px solid var(--contraster)

.fm-header.levelzero
	padding-left: 40px
	padding-right: 40px
	.conditional
		width: 50%

.fm-header.levelone
	padding-left: 24px
	padding-right: 24px
	.conditional
		max-width: 40%

.fm-header.leveltwo
	padding-left: 16px
	padding-right: 16px
	.conditional
		display: none

.logo
	font-family: 'Space Grotesk', sans-serif
	font-size: 18px
	font-weight: 500
	z-index: 1000
	color: var(--background)

.loner
	color: var(--background)

</style>
