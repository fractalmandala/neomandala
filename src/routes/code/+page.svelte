<script lang="ts">

    import { onMount } from 'svelte'
    import { allWebdev } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'

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


<div class="rta-grid grid2 right00 fullH cushion back">
    <div class="rta-grid grid3 colgap300 rowgap100 postgrid">
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-column ybetween rowgap400 ticket" href="{item.linkpath}">
                    <div class="rta-column rowgap100 null">
                        <h5 class="tt-u">{item.meta.id} - {item.meta.title}</h5>
                        <small>{item.meta.type} | {item.meta.tags}</small>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null" class:invisible={$readingMode}>
        <img class="jello-vertical" src="/images/k-webdev.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">code</h3>
        <p class="grey">Just enough HTML, CSS and JS to have put this site together. And a bit more...</p>
    </div>
</div>

<style lang="sass">

.ticket
    padding: 16px

</style>