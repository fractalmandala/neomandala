<script lang="ts">
	import { browser } from '$app/environment';
	import Motif from '$lib/assets/Motif.svelte';
	import { themeMode, breakZero, breakOne, breakTwo, pageTitle } from '$lib/stores/globalstores';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { slide } from 'svelte/transition';
	import Moon from '$lib/design/iconset/moon.svelte';
	import Sun from '$lib/design/iconset/sun.svelte';
	import Add from '$lib/design/iconset/add.svelte';
	import Pin from '$lib/design/iconset/chevrondown.svelte';
	import { showPinned, hidePinned } from '$lib/dash/modalstores';

	let dimension = 16;
	let menuNav = false;
	let fake = false;
	let dropped = false;
	export let logged: boolean;

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

<div
	class="fm-header"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
	on:mouseleave={closeHelper}
>
	<div class="rta-row">
		<Motif />
		<a href="/" class="logo">
			{#each text.split('') as char, i}
				<span class="text-animation" style="animation-delay: {i * 0.04}s">{char}</span>
			{/each}
		</a>
	</div>
	<div class="rta-row colgap400 ycenter xend outrow">
		<div class="rta-column">
			<button class="blank-button" style="z-index: 1200" on:click={toggleDrop}>
				<Pin />
			</button>
			{#if dropped}
				<div
					class="rta-column dropped"
					use:clickOutsideAction
					on:clickOutside={toggleDrop}
					transition:slide={{ duration: 200 }}
					on:click={toggleDrop}
					on:keydown={fauxfake}
				>
					<p>
						<a href="/know">KNOW</a>
					</p>
					{#if logged}
						<p>
							<a href="/bot">BOT</a>
						</p>
						<p>
							<a href="/pad">PAD</a>
						</p>
						<p>
							<a href="/code">CODE</a>
						</p>
						<p>
							<a href="/dashboard">DASH</a>
						</p>
						<p>
							<a href="/jp">JP</a>
						</p>
					{/if}
					<p>
						<a href="/word">WORD</a>
					</p>
					<p>
						<a href="/web">WEB</a>
					</p>
					<p>
						<a href="/image">IMAGE</a>
					</p>
					<p>
						<a href="/sound">SOUND</a>
					</p>
					<p>
						<a href="/video">VIDEO</a>
					</p>
				</div>
			{/if}
		</div>

		<button class="blank-button" on:click={handleSwitch}>
			{#if $themeMode}
				<Moon {dimension} />
			{:else}
				<Sun {dimension} />
			{/if}
		</button>
	</div>
</div>

<style lang="sass">

.dropped
	position: absolute
	background: var(--this)
	top: 56px
	right: 64px
	text-align: right
	padding: 16px
	row-gap: 4px	
	p a
		font-size: 18px
		color: var(--texttwo)
		&:hover
			color: #10D56C
	@media screen and (max-width: 768px)
		right: 0
		left: 0
		min-width: 100vw
		height: calc(100vh - 56px)
		top: 56px
		background: rgba(0,0,0,0.8)
		p a
			color: var(--texttwo)
			font-size: 24px
			

.lightmode
	.dropped
		box-shadow: 5px 4px 12px #e1e1e1
		width: 120px


.darkmode
	.dropped
		box-shadow: 5px 4px 12px #070707
		width: 120px

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
	height: 56px
	align-items: center
	z-index: 1000
	.rta-row
		column-gap: 24px

.fm-header.darkmode
	background: #070707
	border-bottom: 1px solid var(--onlyblack)

.fm-header.lightmode
	background: #f7f7f7
	border-bottom: 1px solid var(--onlyblack)

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
	color: var(--texttwo)

</style>
