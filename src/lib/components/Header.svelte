<script lang="ts">
	import { browser } from '$app/environment';
	import Menu from '$lib/design/iconset/menu.svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { fly } from 'svelte/transition';
	import Moon from '$lib/design/iconset/moon.svelte';
	import Sun from '$lib/design/iconset/sun.svelte';
	import Add from '$lib/design/iconset/add.svelte';

	let dimension = 16;
	let menuNav = false;
	export let pageTitle = '';
	export let logged: boolean;

	let link1 = 'pad';
	let link2 = 'cod';
	let link3 = 'wor';
	let link4 = 'ima';
	let link5 = 'sou';
	let link6 = 'vid';
	let link7 = 'bot';

	let greener1 = false;
	let greener2 = false;
	let greener3 = false;
	let greener4 = false;
	let greener5 = false;
	let greener6 = false;
	let greener7 = false;

	$: if (pageTitle === link1) {
		greener1 = true;
	} else greener1 = false;

	$: if (pageTitle === link2) {
		greener2 = true;
	} else greener2 = false;

	$: if (pageTitle === link3) {
		greener3 = true;
	} else greener3 = false;

	$: if (pageTitle === link4) {
		greener4 = true;
	} else greener4 = false;

	$: if (pageTitle === link5) {
		greener5 = true;
	} else greener5 = false;

	$: if (pageTitle === link6) {
		greener6 = true;
	} else greener6 = false;

	$: if (pageTitle === link7) {
		greener7 = true;
	} else greener7 = false;

	function toggleMenuNav() {
		menuNav = !menuNav;
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

<div
	class="fm-header"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
>
	<a href="/" class="logo">
		{#each text.split('') as char, i}
			<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
		{/each}
	</a>
	<div class="rta-row ycenter outrow">
		{#if menuNav || $breakZero || $breakOne}
			<div class="rowinside rta-row ycenter" transition:fly>
				{#if logged}
					<div class="link" class:isgreen={greener7}>
						<a href="/bot">{link7}</a>
					</div>
					<div class="link" class:isgreen={greener1}>
						<a href="/pad">{link1}</a>
					</div>
					<div class="link" class:isgreen={greener2}>
						<a href="/code">{link2}</a>
					</div>
				{/if}
				<div class="link" class:isgreen={greener3}>
					<a href="/word">{link3}</a>
				</div>
				<div class="link" class:isgreen={greener4}>
					<a href="/image">{link4}</a>
				</div>
				<div class="link" class:isgreen={greener5}>
					<a href="/sound">{link5}</a>
				</div>
				<div class="link" class:isgreen={greener6}>
					<a href="/video">{link6}</a>
				</div>
			</div>
		{/if}
		<button class="blank-button" on:click={handleSwitch}>
			{#if $themeMode}
				<Moon {dimension} />
			{:else}
				<Sun {dimension} />
			{/if}
		</button>
		<button class="blank-button" on:click={toggleMenuNav}>
			{#if $breakTwo}
				<Menu />
			{/if}
		</button>
		<slot name="logger" />
	</div>
</div>

<style lang="sass">

.logo
	cursor: pointer
	&:hover
		.text-animation
			animation: colorchange 0.5s forwards

.leveltwo
	.rowinside
		position: absolute
		padding: 24px
		z-index: 1000
		top: 56px
		right: 0
		width: 100vw
		height: calc(100vh - 56px)
		display: flex
		flex-direction: column
		align-items: flex-end
		text-align: right
		background: rgba(0,0,0,0.75)
		color: white
		row-gap: 20px
		.link
			font-size: 27px

@keyframes colorchange
	0%
		color: #474747
	50%
		color: #10D56C
	100%
		color: #474747

.rta-row
	z-index: 1000

.link
	font-size: 14px
	font-family: 'Space Grotesk', sans-serif
	font-weight: 500
	z-index: 1000
	position: relative
	text-transform: uppercase
	&::after
		background: #10D56C
		content: ''
		bottom: 0
		position: absolute
		left: 0
		height: 2px
		width: 100%
		margin-left: 50%
		width: 0%
		transition: 0.1s
	&:hover
		&::after
			margin-left: 0
			width: 100%

.link.isgreen
	color: #10D56C

.fm-header
	display: flex
	flex-direction: row
	justify-content: space-between
	width: 100%
	height: 56px
	align-items: center
	z-index: 1000
	.rta-row
		column-gap: 20px

.fm-header
	border-bottom: 1px solid var(--contraster)
	background: var(--this)

.fm-header.levelzero, .fm-header.levelone
	padding-left: 40px
	padding-right: 40px

.fm-header.leveltwo
	padding-left: 16px
	padding-right: 16px

.logo
	font-family: 'Space Grotesk', sans-serif
	font-size: 18px
	font-weight: 500
	z-index: 1000

</style>
