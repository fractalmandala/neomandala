<script lang="ts">
	import { onMount } from 'svelte';
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
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

	onMount(async () => {
		images = await supaImages(low, top);
		posts = await featuredWritings();
		webs = await featuredWebdev();
	});
</script>

<div class="back" />
<div class="rta-column colgap600 ybetween"
  class:levelzero={$breakZero}
  class:levelone={$breakOne}
  class:leveltwo={$breakTwo}
  class:light={$themeMode}
  class:dark={!$themeMode}
	>
	<div class="rta-column null">
		<div class="rta-column rowgap300 ycenter minH null p-bot-32 p-top-32 padding-l0">
			<h3 class="padding-l1">
				<span class="gradienter">The Fractal Maṇḍala</span> is a digital garden and buildstation.
			</h3>
			<p class="padding-l1">
				Here I document what I learn, build and write. I develop web products, create historical
				fiction worlds, dabble in psytrance production and write essays on Indian history and
				civilizational consciousness. My big projects:
			</p>
			<div class="rta-grid grid3 colgap500 rowgap600 p-top-32 p-bot-32" bind:this={ref}>
				<div class="rta-column rowgap200 glass-top p-top-32" class:gleamer={$isVisible}>
					<h5 class="gradienter"><a href="/build/brhatopenlibrary">Bṛhat Open Library</a></h5>
					<p>A digital library of Dhārmika Literature, but something more...</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" class:gleamer={$isVisible}>
					<h5>Synaptic Reconnection</h5>
					<p>Building a modern ontology, epistemology and teleology drawing from Dhārmika cores.</p>
				</div>
				<div class="rta-column rowgap200 glass-top p-top-32" class:gleamer={$isVisible}>
					<h5 class="gradienter"><a href="/build/sveltekitui">Sveltekit UI</a></h5>
					<p>A Sveltekit components library solving for plumbing and custom aesthetics.</p>
				</div>
			</div>
		</div>
			<div class="rta-grid grid4 by4 rowgap500 colgap500 minH p-top-64 p-bot-64 colgap100 padding-l0">
				{#if images && images.length > 0}
					{#each images as item}
						<a class="rta-image" href="/image/{item.slug}">
							<img src={item.link} alt={item.id} />
						</a>
					{/each}
				{/if}
			</div>
		<div class="rta-column rowgap600 p-top-64 p-bot-64 padding-l0">
			<div class="glass-top p-top-32">
			<h3 class="titular">Featured Essays:</h3>
			</div>
			<div class="rta-grid colgap300 rowgap300">
				{#if posts && posts.length > 0}
					{#each posts as item}
						<a href="/word/{item.slug}" class="rta-row stay colgap300 glass-left p-left-32 p-top-32 p-bot-32">
							<div class="rta-image height-20 w32" style="height-30">
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
		<div class="rta-column rowgap600 p-top-64 p-bot-64 minH padding-l0">
			<div class="glass-top p-top-32">
				<h3 class="titular">Webdev Posts:</h3>
			</div>
			<div class="rta-grid grid3 colgap400 rowgap400">
				{#if webs && webs.length > 0}
					{#each webs as item}
						<a href={item.linkpath} class="rta-column rowgap100 null glass p0 glass-bottom">
							<h5>{item.meta.title}</h5>
							<p class="gradienter">{item.meta.type} | {item.meta.tags}</p>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap300 p-top-64 p-bot-64 padding-l0">
			<div class="glass-top p-top-32">
				<h3 class="titular">About</h3>
			</div>
			<p>
				<span class="gradienter">STACK</span> Frontend: Sveltekit | Database: Supabase | Design: Figma | Scroll: Lenis | Utilities: Svelte
				Legos | Blogging: MDSVex
			</p>
		<p
			>I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
				href="https://www.brhat.in"
				target="_blank"
				rel="noreferrer">Bṛhat</a
			>, a cultural content, research and learning organization. Apart from this site, I also
			develop and maintain Bṛhat's website and the sister portal
			<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer">Bṛhat Education.</a
			></p
		>
		<small
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


.titular
    text-transform: uppercase

.back
    background-image: url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/realitywall.webp')
    height: calc(100vh - 64px)
    border-radius: 6px

</style>
