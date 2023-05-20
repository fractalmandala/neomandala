<script lang="ts">

    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { thisWritings, pageWritings } from '$lib/utils/supabase' 
    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    let theme:any
    let image:any
    let prevID:number
    let nextID:number
    let prevPost:any
    let nextPost:any

    export let data

    prevID = data.id - 1
    nextID = data.id + 1

    onMount(async() => {
        theme = $page.url.pathname.slice(6)
        image = await thisWritings(theme)
        prevPost = await pageWritings(prevID)
        nextPost = await pageWritings(nextID)
    })

</script>

<div class="rta-grid grid2 right00 screen fullH">
    <div class="rta-column writing postis">
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
    <div class="rta-column titlebox">
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