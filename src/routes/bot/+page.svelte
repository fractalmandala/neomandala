<script lang="ts">

    import { onMount } from 'svelte'
    import { gptTitles } from '$lib/utils/supabase'
    import { audioStore } from '$lib/stores/modalstores'
    let pens:any
    let thisChat:any
    let audio:any
    audioStore.subscribe(value => audio = value)
    let low = 0
    let top = 14

    let fake = false

    function fauxfake(){
        fake = !fake
    }


    onMount(async() => {
        pens = await gptTitles(low, top);
    })

</script>


<div class="rta-grid grid2 right00 screen fullH cushion back">
    <div class="rta-grid grid3 colgap300 rowgap100">
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-column ybetween rowgap100 ticket" href="/bot/{item.indexing}">
                    <div class="rta-column rowgap200 null">
                        <h5 class="tt-u">{item.indexing} - {item.title}</h5>
                        <small>{item.theme}</small>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-gpt.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">bot</h3>
        <p class="grey">he thinks, therefore he is?</p>
    </div>
</div>

<style lang="sass">

.ticket
    padding: 16px
    transition: 0.07s
    border-radius: 6px
    overflow: visible
    &:hover
        box-shadow: 5px 8px 12px #e1e1e1, -5px -4px 10px #f1f1f1

</style>