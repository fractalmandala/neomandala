<script lang="ts">

	import { onMount } from 'svelte';
	import { supaImages, featuredWritings } from '$lib/utils/supabase';
    import { featuredWebdev } from '$lib/utils/localpulls'
	import Github from '$lib/icons/Github.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import Logo from '$lib/assets/FMLogo.svelte';
	import { svelteTools, svelteLinks, svelteLearn } from '$lib/assets/sveltekittools';
	let width = '100%';

    let posts: any;
    let webs:any
	let images: any;
	let low = 0;
	let top = 7;

	onMount(async () => {
		images = await supaImages(low, top);
        posts = await featuredWritings();
        webs = await featuredWebdev();
	});
</script>

<div class="back minH" />
<div class="rta-column colgap600 ybetween screen cushion">
	<div class="rta-column null">
		<div class="rta-column null p-bot-32 p-top-32">
			<h4>
				<span style="color: var(--green); font-weight: bold">The Fractal Maṇḍala</span> is a digital
				garden to chronicle what I learn and build. I develop web products, create historical fiction
				worlds, dabble in psytrance production and write essays on Indian history and civilizational
				consciousness. My big projects:
			</h4>
		</div>
		<div class="rta-grid grid3 colgap300 postis p-top-8 p-bot-32">
			<div class="rta-column rowgap100">
				<h6 class="tt-c"><a href="/build/brhatopenlibrary">Bṛhat Open Library</a></h6>
                <small>A digital library of Dhārmika Literature, but something more...</small>
			</div>
			<div class="rta-column rowgap100">
				<h5>Synaptic Reconnection</h5>
                <small>Building a modern ontology, epistemology and teleology drawing from Dhārmika cores.</small>
			</div>
			<div class="rta-column rowgap100">
				<h5><a href="/build/sveltekitui">Sveltekit UI</a></h5>
                <small>A Sveltekit components library solving for plumbing and custom aesthetics.</small>
			</div>
		</div>
		<div class="rta-column rowgap400 p-top-32 p-bot-64">
			<div class="rta-grid grid8 colgap100">
				{#if images && images.length > 0}
					{#each images as item}
						<a class="rta-image" href="/image/{item.slug}">
							<img src={item.link} alt={item.id} />
						</a>
					{/each}
				{/if}
			</div>
		</div>
        <div class="rta-column rowgap400 bord-top p-top-64 p-bot-64">
            <h3 class="titular">Featured Essays:</h3>
            <div class="rta-grid grid2 colgap300 rowgap300">
                {#if posts && posts.length > 0}
                    {#each posts as item}
                        <a href="/word/{item.slug}" class="rta-row colgap200">
                            <div class="rta-image w32 height-16">
                                <img src={item.image} alt={item.id}/>
                            </div>
                            <div class="rta-column w64 rowgap100 null">
                                <h6>{item.title}</h6>
                                <small class="green">{item.type} | {item.tags}</small>
                            </div>
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="rta-column rowgap400 bord-top p-top-64 p-bot-64">
            <h3 class="titular">Featured Webdev:</h3>
            <div class="rta-grid grid3 colgap300 rowgap300">
                {#if webs && webs.length > 0}
                    {#each webs as item}
                        <a href="{item.linkpath}" class="rta-column rowgap100 null">
                                <h6>{item.meta.title}</h6>
                                <small class="green">{item.meta.type} | {item.meta.tags}</small>
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="rta-column rowgap300 bord-top p-top-64 p-bot-64">
            <h3 class="titular">My Stack:</h3>
            <p class="grey">Frontend: Sveltekit | Database: Supabase | Design: Figma | Scroll: Lenis | Utilities: Svelte Legos | Blogging: MDSVex</p>
        </div>
	</div>
	<div class="rta-column bord-top p-top-64 last postis">
		<small
			>I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
				href="https://www.brhat.in"
				target="_blank"
				rel="noreferrer">Bṛhat</a
			>, a cultural content, research and learning organization. Apart from this site, I also
			develop and maintain Bṛhat's website and the sister portal
			<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer">Bṛhat Education.</a
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
    border-left: 4px solid var(--green)
    margin-left: -32px
    padding-left: 32px
    text-transform: uppercase

.back
    background-image: url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/realitywall.webp')
    width: calc(100vw - 96px)
    height: 100vh

.screen
    min-height: 100vh
    padding: 64px
    width: 1200px

.last
    width: 60%


</style>
