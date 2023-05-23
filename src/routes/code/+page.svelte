<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
    import { allWebdev } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'

    import Pagination from '$lib/components/Pagination.svelte'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    let pens:any
    let audio:any
    audioStore.subscribe(value => audio = value)
    let fake = false

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        pens = await allWebdev();
    })

</script>

<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="shellmain rta-grid colgap500 rowgap500">
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-column ybetween rowgap100 null glass-left p-left-32 p-bot-16" href="{item.linkpath}">
                    <div class="rta-column rowgap100 null">
                        <h5 class="tt-c hover">{item.meta.id} - {item.meta.title}</h5>
                        <p class="gradienter">{item.meta.type} | {item.meta.tags}</p>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
    <div class="shellside rta-column fullW rowgap300 null">
        <div class="rta-column column-row rowgap200">
            <img class="jello-vertical w32" src="/images/k-webdev.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
            <div class="rta-column rowgap50 bord-bot p-bot-32 w64">
        <h6 class="tt-u">code</h6>
        <small class="grey">Just enough HTML, CSS and JS to have put this site together. And a bit more...</small>
            </div>
        </div>
    </div>

</div>

