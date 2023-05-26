<script lang="ts">

    import { onMount } from 'svelte'
    import { loadingStore } from '$lib/stores/globalstores'
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
	import AppShell from '$lib/design/AppShell.svelte';
    import { supaImages } from '$lib/utils/supabase' 
    import { audioStore } from '$lib/stores/modalstores'
    import Pagination from '$lib/components/Pagination.svelte'
    import { scale } from 'svelte/transition'
    import { loadingAction } from '$lib/utils/loadingaction'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Loader from '$lib/assets/Loader.svelte'
    
    let images:any
    let low = 0
    let top = 31
    let audio:any
    audioStore.subscribe(value => audio = value)

    let fake = false
    let loading = false

    function nextEight(){
        low += 32
        top += 32
    }

    function prevEight(){
        low -= 32
        top -= 32
    }

    $: if ( low ) {
        (async() => {
            loadingStore.set(true)
            images = await supaImages(low, top)
            loadingStore.set(false)
        })();
    }

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await supaImages(low,top)
    })

</script>


<div class="rta-column"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="rta-grid grid8 stay2 colgap100 rowgap100">
        {#if images && images.length > 0}
            {#each images as item}
                <a class="rta-image height-24" href="/image/{item.slug}">
                    <img src={item.link} alt={item.id} use:loadingAction={loading} transition:scale/>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-row fullW xcenter-d xcenter-m p-top-8">
        <Pagination>
            <div slot="prev">
                <button class="blank-button" on:click={prevEight}>
                    <ChevFLeft/>
                </button>
            </div>
            <div slot="next">
                <button class="blank-button" on:click={nextEight}>
                    <ChevFRight/>
                </button>
            </div>
        </Pagination>
    </div>
</div>
