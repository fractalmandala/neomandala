<script lang="ts">

    import { onMount } from 'svelte'
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { thisWritings, pageWritings } from '$lib/utils/supabase' 
    import { readingMode } from '$lib/stores/globalstores'
    import { elementSizeStore } from '$lib/utils/elementsize'
    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Read from '$lib/icons/Reading.svelte'
    let theme:any
    let image:any
    let prevID:number
    let nextID:number
    let prevPost:any
    let nextPost:any
    let ref:HTMLElement | null = null
    let y:number

    export let data

    prevID = data.id - 1
    nextID = data.id + 1

    $: size = elementSizeStore(ref);

    $: perCent = y / $size.height

	function toggleReading() {
		if (browser) {
			readingMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('readingMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

    onMount(async() => {
        theme = $page.url.pathname.slice(6)
        image = await thisWritings(theme)
        prevPost = await pageWritings(prevID)
        nextPost = await pageWritings(nextID)
    })

</script>

<svelte:window bind:scrollY={y}/>

<div class="rta-grid grid2 right00 screen fullH">
    <div class="rta-column writing postis" bind:this={ref}>
        <div class="progress-strip">
            <div class="inside" style="width: {perCent * 100}%"></div>
        </div>
        <div class="rta-image height-40 m-bot-64">
            {#if image && image.length > 0}
                {#each image as item}
                    <img src={item.image} alt={item.title}/>
                {/each}
            {/if}
        </div>
        <svelte:component this={data.content}/>
        <div class="rta-row bord-top m-bot-32 null ycenter colgap200 p-top-32">
            <h6>Prev:</h6>
            {#if prevPost && prevPost.length > 0}
            {#each prevPost as item}
                <p><a href="/word/{item.slug}">{item.title}</a></p>
            {/each}
            {/if}
        </div>
    </div>
    <div class="rta-column titlebox" class:invisible={$readingMode}>
        <p>{$readingMode}</p>
        <a href="/word" class="rta-row null ycenter">
            <small>Word</small>
            <ChevRight/>
        </a>
        <h4 class="tt-u">{data.title}</h4>
        <Pagination>
            <div slot="prev">
            {#if prevPost && prevPost.length > 0}
                {#each prevPost as item}
                    <a href="/word/{item.slug}" class="blank-button">
                        <ChevFLeft/>
                    </a>
                {/each}
            {/if}
            </div>
            <div slot="next">
            {#if nextPost && nextPost.length > 0}
                {#each nextPost as item}
                    <a href="/word/{item.slug}" class="blank-button">
                        <ChevFRight/>
                    </a>
                {/each}
            {/if}
            </div>
        </Pagination>
    </div>
</div>

<style lang="sass">

.titlebox.invisible
    opacity: 0

.progress-strip
    width: 100%
    height: 32px
    background: var(--opposite)
    position: sticky
    top: 0
    left: 0
    z-index: 500
    .inside
        background: var(--green)
        height: 6px

</style>