<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { thisWebdev } from '$lib/utils/localpulls'
    import { readingMode } from '$lib/stores/globalstores'
	import Copy from '$lib/icons/Copy.svelte'
    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Prism from 'prismjs';
    import '$lib/prismextras.js'
    import '$lib/styles/prismextras.css'
    let theme:any

    export let data
    let prevID:number
    let nextID:number
    let prevPost:any
    let nextPost:any

    onMount(async() => {
        theme = data.type
        prevID = data.id - 1
        nextID = data.id + 1
        prevPost = await thisWebdev(prevID)
        nextPost = await thisWebdev(nextID)
        Prism.highlightAll();
    })

</script>


<AppShell>
    <div slot="main" class="rta-column rowgap200">
        <div class="codecuts">
            <svelte:component this={data.content}/>
        </div>
    </div>
    <div slot="side" class="rta-column xstretch fullW rowgap300 null">
        <h5 class="tt-u p-left-32">{data.title}</h5>
        <div class="p-bot-32 p-left-32">
        <Pagination>
            <div slot="prev">
                {#if prevPost && prevPost.length > 0}
                    {#each prevPost as item}
                        <a href="{item.linkpath}" class="blank-button">
                            <ChevFLeft/>
                        </a>
                    {/each}
                {/if}
            </div>
            <div slot="next">
                {#if nextPost && nextPost.length > 0}
                    {#each nextPost as item}
                        <a href="{item.linkpath}" class="blank-button">
                            <ChevFRight/>
                        </a>
                    {/each}
                {/if}
            </div>
        </Pagination>
    </div>

</AppShell>
