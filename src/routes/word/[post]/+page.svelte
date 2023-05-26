<script lang="ts">

    import { onMount } from 'svelte'
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
    import { browser } from '$app/environment'
    import { page } from '$app/stores'
    import { thisWritings, pageWritings } from '$lib/utils/supabase' 
    import { elementSizeStore } from '$lib/utils/elementsize'
    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
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

    onMount(async() => {
        theme = $page.url.pathname.slice(6)
        image = await thisWritings(theme)
        prevPost = await pageWritings(prevID)
        nextPost = await pageWritings(nextID)
    })

</script>

<svelte:window bind:scrollY={y}/>

<div
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>

    <div class="shellmain" bind:this={ref}>
        <div class="progress-strip">
            <div class="inside" style="width: {perCent * 100}%"></div>
        </div>
        <div class="rta-image height-40-40 m-bot-64">
            {#if image && image.length > 0}
                {#each image as item}
                    <img src={item.image} alt={item.title}/>
                {/each}
            {/if}
        </div>
        <div class="thisispost" class:thisisback={$readingMode}>
            <svelte:component this={data.content}/>
        </div>
        <div class="rta-row bord-top m-bot-32 null ycenter colgap200 p-top-32">
            <h6>Next:</h6>
            {#if prevPost && prevPost.length > 0}
            {#each prevPost as item}
                <p class="green"><a href="/word/{item.slug}">{item.title}</a></p>
            {/each}
            {/if}
        </div>
    </div>
    <div class="shellside rta-column column-rev fullW rowgap300 null" class:invisible={$readingMode}>
        <h4 class="tt-u">{data.title}</h4>
        <div class="rta-column column-row bord-bot">
            <p class="gradienter p-bot-32">{data.type}</p>
            <div class="p-bot-32">
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
    </div>

</div>