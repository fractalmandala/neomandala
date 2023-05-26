<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from 'svelte-reveal';
	import Parallax from '$lib/components/Parallax.svelte'
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
	import RevealHead from '$lib/anims/RevealHead.svelte'
	import Animations from "textify.js";
	import { breakZero, breakOne, breakTwo, themeMode, readingMode, windowWidth, scrollY } from '$lib/stores/globalstores'
	import Github from '$lib/icons/Github.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
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
	let scY:number
	let trY:number

	$: if ($isVisible) {
		trY = scY
	} else {
		trY = 0
	}

	onMount(async () => {
		images = await supaImages(low, top);
		posts = await featuredWritings();
		webs = await featuredWebdev();
	});
</script>

<svelte:window bind:scrollY={scY}/>

<div class="x00">
	<Parallax --parallax="url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/realitywall.webp')"/>
</div>
<div class="rta-column colgap600 ybetween"
  class:levelzero={$breakZero}
  class:levelone={$breakOne}
  class:leveltwo={$breakTwo}
  class:light={$themeMode}
  class:dark={!$themeMode}
	>
	<div class="rta-column null">
		<div class="rta-column xcenter ta-c rowgap300 ycenter minH null p-bot-32 p-top-32 padding-l0">
			<h2 class="mol" use:reveal={{ delay: 200 }}>
				<span class="gradienter tt-u">The Fractal Maṇḍala</span><br> is a digital garden and buildstation.
			</h2>
			<p class="padding-l1" use:reveal={{ delay: 500 }}>
				Here I document what I learn, build and write. I develop web products, create historical
				fiction worlds, dabble in psytrance production and write essays on Indian history and
				civilizational consciousness. My big projects:
			</p>
			<div class="rta-grid grid3 colgap500 rowgap600 p-top-32 p-bot-32">
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 200}}>
					<h5 class="gradienter"><a href="/build/brhatopenlibrary">Bṛhat Open Library</a></h5>
					<p>A digital library of Dhārmika Literature, but something more...</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 400}}>
					<h5 class="gradienter"><a href="/build/synaptic">Synaptic Reconnection</a></h5>
					<p>Building a modern ontology, epistemology and teleology drawing from Dhārmika cores.</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" use:reveal={{ delay: 600}}>
					<h5 class="gradienter"><a href="/build/sveltekitui">Sveltekit UI</a></h5>
					<p>A Sveltekit components library solving for plumbing and custom aesthetics.</p>
				</div>
			</div>
		</div>
		<div class="rta-column minH rowgap100 colgap100 padding-l0 x11 p-bot-64" bind:this={ref}>
			<div class="glass-top p-top-32 p-bot-32">
				<h3 class="noh tt-u grey ta-c" use:reveal>Midjourneys</h3>
			</div>
			<div class="movingparall rta-grid grid4 stay2 rowgap500 colgap500 p-bot-64">
				{#if images && images.length > 0}
					{#each images as item, i}
						<a class="rta-image" href="/image/{item.slug}" use:reveal={{ delay: i*40}}>
							<img src={item.link} alt={item.id} />
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap100 p-top-64 xcenter p-bot-64 padding-l0">
			<div class="glass-top p-top-32">
			<h3 class="noh tt-u grey ta-c" use:reveal>Featured Essays</h3>
			</div>
			<div class="rta-grid grid2 colgap300 xcenter ta-c rowgap300">
				{#if posts && posts.length > 0}
					{#each posts as item, i}
						<a href="/word/{item.slug}" class="rta-column rowgap200 glass-bottom p-top-32 p-bot-32" use:reveal={{ delay: i * 5}}>
							<div class="rta-image height-30-3 w32" style="height-30">
								<img src={item.image} alt={item.id} />
							</div>
							<div class="rta-column w64 rowgap100 null">
								<h4 class="noh">{item.title}</h4>
								<p class="gradienter">{item.type} | {item.tags}</p>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap600 xcenter p-top-64 p-bot-64 minH padding-l0">
			<div class="glass-y p-top-32">
				<h3 class="noh tt-u grey ta-c" use:reveal>Webdev Posts</h3>
			</div>
			<div class="rta-grid grid3 colgap400 rowgap400 xcenter">
				{#if webs && webs.length > 0}
					{#each webs as item, i}
						<a href={item.linkpath} class="rta-column xcenter ta-c rowgap100 null p0" use:reveal={{ delay: i * 40 }}>
							<h5 class="noh">{item.meta.title}</h5>
							<p class="gradienter">{item.meta.type} | {item.meta.tags}</p>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap300 xcenter p-top-64 p-bot-64 padding-l0">
			<div class="glass-top p-top-32">
				<h3 class="mol tt-u grey ta-c" use:reveal>About</h3>
			</div>
			<p use:reveal class="ta-c">
				<span class="gradienter">STACK</span> Frontend: Sveltekit | Database: Supabase | Design: Figma | Scroll: Lenis | Utilities: Svelte
				Legos | Blogging: MDSVex
			</p>
		<p class="ta-c"
			>I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
				href="https://www.brhat.in"
				target="_blank"
				rel="noreferrer">Bṛhat</a
			>, a cultural content, research and learning organization. Apart from this site, I also
			develop and maintain Bṛhat's website and the sister portal
			<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer">Bṛhat Education.</a
			></p
		>
		<small class="ta-c"
			><a
				href="https://www.flaticon.com/free-icons/chatbot"
				title="chatbot icons"
				target="_blank"
				rel="noreferrer">Chatbot icons created by Freepik - Flaticon</a
			>
			|
			<a
				href="https://www.flaticon.com/free-icons/hacker"
				target="_blank"
				rel="noreferrer"
				title="hacker icons">Hacker icons created by Freepik - Flaticon</a
			></small
		>
		<div class="rta-row">
			<Github />
			<Twitter />
		</div>
		</div>
	</div>
</div>

<style lang="sass">

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
    padding: 0px 32px

.x11
    min-height: 100vh
    overflow: hidden

</style>
