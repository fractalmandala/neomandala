<script lang="ts">
	import { onMount } from 'svelte';
	import { sideMode, toggleSide, themeMode } from '$lib/stores/globalstores';
	import Close from '$lib/design/iconset/close.svelte';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { slide, fly } from 'svelte/transition';
	import { allJanapada, allThea } from '$lib/utils/supastream';
	import Acco from '$lib/design/MandAccordionItem.svelte';
	import { allIndex, featuredWord, allWebdev } from '$lib/utils/localpulls';

	let knows: any;
	let posts: any;
	let webs: any;
	let thes: any;
	let novel: any;
	let isOn = Array(10).fill(false);
	export let logger = false;
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

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
		thes = await allThea();
		novel = await allJanapada();
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
						<div
							class="rta-column rowgap100 p-bot-32"
							transition:slide
							on:click={handleClose}
							on:keydown={fauxfake}
						>
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
						<div
							class="rta-column rowgap100 p-bot-32"
							transition:slide
							on:click={handleClose}
							on:keydown={fauxfake}
						>
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
						<div
							class="rta-column rowgap100 p-bot-32"
							transition:slide
							on:click={handleClose}
							on:keydown={fauxfake}
						>
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
					<div
						class="rta-column rowgap100 p-bot-32"
						transition:slide
						on:click={handleClose}
						on:keydown={fauxfake}
					>
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
				<button class="blank-button ta-r" on:click={handleClose} on:keydown={fauxfake}>
					<a class="titular" href="/sound">Sound</a>
				</button>
				<button class="blank-button ta-r" on:click={handleClose} on:keydown={fauxfake}>
					<a class="titular" href="/video">Video</a>
				</button>
				{#if logger}
					<div on:click={handleClose} on:keydown={fauxfake} class="ta-r rta-column rowgap200">
						<a class="titular" href="/pad">Pad</a>
						<a class="titular" href="/dashboard">Dash</a>
						<a class="titular" href="/bot">Bot</a>
					</div>
					<a class="titular blank-button ta-r" href="/uicomp">Design</a>
					<button class="titular blank-button" on:click={() => toggleOn(5)}>Thea</button>
					{#if isOn[5]}
						{#if thes && thes.length > 0}
							<div
								class="rta-column rowgap100 p-bot-32"
								transition:slide
								on:click={handleClose}
								on:keydown={fauxfake}
							>
								<div class="itemer ta-r tt-c">
									<a href="/thea">Main</a>
								</div>
								{#each thes as item}
									<div class="itemer ta-r tt-c">
										<a href="/thea/{item.title}">{item.title}</a>
									</div>
								{/each}
							</div>
						{/if}
					{/if}
					<button class="titular blank-button" on:click={() => toggleOn(6)}>Janapada</button>
					{#if isOn[6]}
						{#if novel && novel.length > 0}
							<div
								class="rta-column rowgap100 p-bot-32"
								transition:slide
								on:click={handleClose}
								on:keydown={fauxfake}
							>
								<div class="itemer ta-r tt-c">
									<a href="/janapada">Janapada</a>
								</div>
								{#each novel as item}
									<div class="itemer ta-r tt-c">
										<a href="/janapada/{item.title}">{item.title}</a>
									</div>
								{/each}
							</div>
						{/if}
					{/if}
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
	@media screen and (max-width: 1023px)
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
	@media screen and (max-width: 1023px)
		width: 100vw
		padding: 24px

.light
	.insider
		background: #171717

.dark
	.insider
		background: white

</style>
