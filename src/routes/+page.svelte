<script lang="ts">
	import { onMount } from 'svelte';
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
	import { elementVisibilityStore } from '$lib/stores/elementvisibilitystore';
	import { featuredWebdev } from '$lib/utils/localpulls';
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
<div class="rta-column colgap600 ybetween">
	<div class="rta-column null">
		<div class="rta-column rowgap500 ycenter minH null p-bot-32 p-top-32">
			<h1>
				<span class="gradienter">The Fractal Maṇḍala</span> is a digital garden and buildstation.
			</h1>
			<h4 class="padding-l1">
				Here I document what I learn, build and write. I develop web products, create historical
				fiction worlds, dabble in psytrance production and write essays on Indian history and
				civilizational consciousness. My big projects:
			</h4>
			<div class="rta-grid grid3 colgap500 rowgap600 postis p-top-8 p-bot-32">
				<div class="rta-column rowgap200 glass-l1">
					<h5 class="gradienter"><a href="/build/brhatopenlibrary">Bṛhat Open Library</a></h5>
					<p>A digital library of Dhārmika Literature, but something more...</p>
				</div>
				<div class="rta-column rowgap200 glass-l1">
					<h5>Synaptic Reconnection</h5>
					<p>Building a modern ontology, epistemology and teleology drawing from Dhārmika cores.</p>
				</div>
				<div class="rta-column rowgap200 glass-l1">
					<h5 class="gradienter"><a href="/build/sveltekitui">Sveltekit UI</a></h5>
					<p>A Sveltekit components library solving for plumbing and custom aesthetics.</p>
				</div>
			</div>
		</div>
			<div class="rta-grid grid4 by4 rowgap500 colgap500 minH colgap100" bind:this={ref}>
				{#if images && images.length > 0}
					{#each images as item}
						<a class="rta-image" href="/image/{item.slug}">
							<img src={item.link} alt={item.id} />
						</a>
					{/each}
				{/if}
			</div>
		<div class="rta-column rowgap400 bord-top p-top-64 p-bot-64">
			<div class="glass-l1">
			<h1 class="titular">Featured Essays:</h1>
			</div>
			<div class="rta-grid colgap300 rowgap500">
				{#if posts && posts.length > 0}
					{#each posts as item}
						<a href="/word/{item.slug}" class="rta-row stay colgap200 slateis">
							<div class="rta-image w32" style="height-30">
								<img src={item.image} alt={item.id} />
							</div>
							<div class="rta-column w64 rowgap100 null">
								<h3>{item.title}</h3>
								<small class="gradienter">{item.type} | {item.tags}</small>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap400 p-top-64 p-bot-64">
			<h3 class="titular">Featured Webdev:</h3>
			<div class="rta-grid grid4 colgap300 rowgap300">
				{#if webs && webs.length > 0}
					{#each webs as item}
						<a href={item.linkpath} class="rta-column rowgap100 null">
							<h6>{item.meta.title}</h6>
							<small class="green">{item.meta.type} | {item.meta.tags}</small>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="rta-column rowgap300 p-top-64 p-bot-64">
			<h2 class="titular">My Stack:</h2>
			<p class="grey">
				Frontend: Sveltekit | Database: Supabase | Design: Figma | Scroll: Lenis | Utilities: Svelte
				Legos | Blogging: MDSVex
			</p>
		</div>
	</div>
	<div class="rta-column bord-top p-top-64 last postis" >
		<small class="grey"
			>I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
				href="https://www.brhat.in"
				target="_blank"
				rel="noreferrer">Bṛhat</a
			>, a cultural content, research and learning organization. Apart from this site, I also
			develop and maintain Bṛhat's website and the sister portal
			<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer">Bṛhat Education.</a
			></small
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

<style lang="sass">

.titular
    text-transform: uppercase

.back
    background-image: url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/realitywall.webp')
    height: calc(100vh - 64px)
    border-radius: 6px

.last
    width: 60%


</style>
