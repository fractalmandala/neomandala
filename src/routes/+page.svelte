<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from 'svelte-reveal';
	import Parallax from '$lib/components/Parallax.svelte';
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
	import RevealHead from '$lib/anims/RevealHead.svelte';
	import Animations from 'textify.js';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		readingMode,
		windowWidth,
		scrollY
	} from '$lib/stores/globalstores';
	import { footerStore, showFooter } from '$lib/stores/modalstores';
	import Logo from '$lib/assets/FMLogo.svelte';
	import { svelteTools, svelteLinks, svelteLearn } from '$lib/assets/sveltekittools';
	let width = '100%';
	let ref: HTMLElement | null = null;

	$: ({ isVisible } = elementVisibilityStore(ref));

	let posts: any;
	let webs: any;
	let images: any;
	let low = 0;
	let top = 7;
	let scY: number;
	let trY: number;

	$: if ($isVisible) {
		trY = scY;
	} else {
		trY = 0;
	}

	onMount(() => {
		(async () => {
			images = await supaImages(low, top);
			posts = await featuredWritings();
			webs = await featuredWebdev();
		})();
	});
</script>

<svelte:head>
	<title>Fractal Maṇḍala | digital garden and buildstation</title>
</svelte:head>

<svelte:window bind:scrollY={scY} />

<div class="x00">
	<Parallax
		--parallax="url('https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/602.webp')"
	/>
</div>
<div
	class="rta-column colgap600 ybetween"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column null">
		<div class="rta-column xcenter ta-c rowgap300 ycenter minH null p-bot-32 p-top-32 padding-l0">
			<img
				class="mandalaimage"
				src="/images/mands.webp"
				alt="mands"
				style="transform: rotate({scY / 3}deg)"
			/>
			<h1 class="noh gradienter tt-u" use:reveal={{ delay: 200 }}>The Fractal Maṇḍala</h1>
			<h3>is a digital garden and buildstation.</h3>
			<p class="padding-l1" use:reveal={{ delay: 500 }}>
				Here I document what I learn, build and write. I develop web products, create historical
				fiction worlds, dabble in psytrance production and write essays on Indian history and
				civilizational consciousness.
			</p>
		</div>
		<div class="rta-column xcenter ta-c rowgap300 ycenter minH null p-bot-32 p-top-32 padding-l0">
			<div class="p-top-32 p-bot-32">
				<h3 class="noh tt-u grey ta-c" use:reveal={{ delay: 500 }}>Big Builds</h3>
			</div>
			<div class="rta-grid grid3 colgap500 rowgap600 p-top-32 p-bot-32">
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 200 }}>
					<div class="rta-image height-30">
						<img src="/images/boloi.webp" alt="bol" />
					</div>
					<h4 class="gradienter"><a href="/build/brhatopenlibrary">Bṛhat Open Library</a></h4>
					<p class="nol">A digital library of Dhārmika Literature, but something more...</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 400 }}>
					<div class="rta-image height-30">
						<img src="/images/synap.webp" alt="synaptic" />
					</div>
					<h4 class="gradienter"><a href="/build/synaptic">Synaptic Reconnection</a></h4>
					<p class="nol">
						Building a modern ontology, epistemology and teleology drawing from Dhārmika cores.
					</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 600 }}>
					<div class="rta-image height-30">
						<img src="/images/sveltoi.webp" alt="svelte" />
					</div>
					<h4 class="gradienter"><a href="/build/sveltekitui">Sveltekit UI</a></h4>
					<p class="nol">
						A Sveltekit components library solving for plumbing and custom aesthetics.
					</p>
				</div>
			</div>
		</div>
		<div class="rta-column minH rowgap100 colgap100 padding-l0 x11 p-bot-64" bind:this={ref}>
			<div class="p-top-32 p-bot-32">
				<h3 class="noh tt-u grey ta-c" use:reveal={{ delay: 500 }}>Midjourneys</h3>
			</div>
			<div class="movingparall rta-grid grid4 stay2 rowgap500 colgap500 p-bot-64">
				{#if images && images.length > 0}
					{#each images as item, i}
						<a class="rta-image" href="/image/{item.slug}" use:reveal={{ delay: i * 40 }}>
							<img src={item.link} alt={item.id} />
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap100 p-top-64 xcenter p-bot-64 padding-l0">
			<div class="p-top-32">
				<h3 class="noh tt-u grey ta-c" use:reveal={{ delay: 500 }}>Featured Essays</h3>
			</div>
			<div class="rta-grid grid2 colgap300 xcenter ta-c rowgap300">
				{#if posts && posts.length > 0}
					{#each posts as item, i}
						<a
							href="/word/{item.slug}"
							class="rta-column rowgap200 glass-bottom p-top-32 p-bot-32"
							use:reveal={{ delay: i * 5 }}
						>
							<div class="rta-image height-30-3 w32" style="height-30">
								<img src={item.image} alt={item.id} />
							</div>
							<div class="rta-column w64 rowgap100 null">
								<h4>{item.title}</h4>
								<p class="gradienter">{item.type} | {item.tags}</p>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap600 xcenter ycenter p-top-64 p-bot-64 minH padding-l0">
			<div class="glass-y p-top-32">
				<h3 class="noh tt-u grey ta-c" use:reveal={{ delay: 500 }}>Webdev Posts</h3>
			</div>
			<div class="rta-grid grid3 colgap400 rowgap400 xcenter">
				{#if webs && webs.length > 0}
					{#each webs as item, i}
						<a
							href={item.linkpath}
							class="rta-column xcenter ta-c rowgap100 null p0"
							use:reveal={{ delay: i * 40 }}
						>
							<h5>{item.meta.title}</h5>
							<p class="gradienter">{item.meta.type} | {item.meta.tags}</p>
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="sass">

.levelzero, .levelone
    .mandalaimage
        width: 200px
        transform-origin: center center

a
    &:hover
        h4, h5
            text-decoration: underline

a
    h4, h5
        transition: 0.08s ease

.x00
    height: 100vh
    overflow: hidden
    padding: 0

.x11
    min-height: 100vh
    overflow: hidden

</style>
