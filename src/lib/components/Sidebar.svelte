<script lang="ts">
	import { onMount } from 'svelte';
	import { sideMode, toggleSide, themeMode } from '$lib/stores/globalstores';
	import Close from '$lib/design/iconset/close.svelte';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { slide, fly } from 'svelte/transition';
	import Acco from '$lib/design/MandAccordionItem.svelte';
	import { allIndex, featuredWord, allWebdev } from '$lib/utils/localpulls';

	let knows: any;
	let posts: any;
	let webs: any;
	let isOn = Array(10).fill(false);
	export let logger = false;

	function toggleOn(index: number) {
		isOn[index] = !isOn[index];
		for (let i = 0; i < isOn.length; i++) {
			if (i !== index && isOn[i] === true) {
				isOn[i] = false;
			}
		}
	}

	function handleClose() {
		toggleSide();
	}

	onMount(async () => {
		knows = await allIndex();
		posts = await featuredWord();
		webs = await allWebdev();
	});
</script>

{#if $sideMode}
	<div
		class="overlay"
		class:light={$themeMode}
		class:dark={!$themeMode}
		transition:slide={{ axis: 'x', duration: 600 }}
	>
		{#if $sideMode}
			<div
				class="rta-column insider rowgap200"
				data-lenis-prevent
				use:clickOutsideAction
				on:clickOutside={handleClose}
				transition:slide={{ axis: 'x', duration: 600 }}
			>
				<div class="rta-row xend m-bot-16">
					<button class="blank-button" on:click={handleClose}>
						<Close dimension={24} />
					</button>
				</div>
				<button class="titular blank-button" on:click={() => toggleOn(1)}> Know </button>
				{#if isOn[1]}
					{#if knows && knows.length > 0}
						<div class="rta-column rowgap100 p-bot-32" transition:slide>
							{#each knows as item}
								<div class="itemer ta-r tt-c">
									<a href={item.linkpath}>
										{item.meta.title}
									</a>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
				<button class="titular blank-button" on:click={() => toggleOn(2)}> Word </button>
				{#if isOn[2]}
					{#if posts && posts.length > 0}
						<div class="rta-column rowgap100 p-bot-32" transition:slide>
							{#each posts as item}
								<div class="itemer ta-r tt-c">
									<a href={item.linkpath}>
										{item.meta.title}
									</a>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
				<button class="titular blank-button" on:click={() => toggleOn(3)}>Webdev</button>
				{#if isOn[3]}
					{#if webs && webs.length > 0}
						<div class="rta-column rowgap100 p-bot-32" transition:slide>
							{#each webs as item}
								<div class="itemer ta-r tt-c">
									<a href={item.linkpath}>
										{item.meta.title}
									</a>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
				<button class="titular blank-button" on:click={() => toggleOn(4)}>Visual Tales</button>
				{#if isOn[4]}
					<div class="rta-column rowgap100 p-bot-32" transition:slide>
						<div class="itemer ta-r tt-c">
							<a href="/image/sutaandsuda">Sūta and Sudā</a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/midjourneys"> the realm psychedelic </a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/deepgreen">deep green</a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/nasadiya">Nasadīya Across Space and Time</a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/bijatobrahman">Bīja to Brahman</a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/realitywall">Reality Wall</a>
						</div>
						<div class="itemer ta-r tt-c">
							<a href="/image/wombo">It Began at Wombo</a>
						</div>
					</div>
				{/if}
				<a class="titular" href="/sound">Sound</a>
				<a class="titular" href="/video">Video</a>
				{#if logger}
					<a class="titular" href="/pad">Pad</a>
					<a class="titular" href="/dashboard">Dash</a>
					<a class="titular" href="/jp">Janapada</a>
					<a class="titular" href="/bot">Bot</a>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style lang="sass">

.titular
	text-align: right
	text-transform: uppercase
	position: relative
	&::after
		position: absolute
		content: ''
		bottom: 0
		right: 0
		width: 0
		height: 2px
		background: #10D56C
		transition: 0.32s
	&:hover
		&::after
			animation: lining 0.43s ease
	@media screen and (min-width: 1024px)
		font-size: 32px

@keyframes lining
	0%
		width: 0
		margin-right: 0
	50%
		width: 100%
		margin-right: 0
	100%
		width: 100%
		margin-right: 100%

.itemer
	line-height: 1.12
	@media screen and (min-width: 1024px)
		font-size: 16px

.light
	.titular, p a
		color: white

.dark
	.titular
		color: #171717
	.itemer
		color: #171717
		a
			color: #171717
		&:hover
			a
				color: #10D56C


.overlay
	display: flex
	flex-direction: column
	position: fixed
	top: 0
	right: 0
	width: 100vw
	height: 100vh
	background: transparent
	z-index: 10000
	
.insider
	position: absolute
	top: 0
	right: 0
	z-index: 10000
	height: 100vh
	overflow-y: scroll
	@media screen and (min-width: 1024px)
		width: 480px
		padding: 40px

.light
	.insider
		background: #171717

.dark
	.insider
		background: white

</style>
