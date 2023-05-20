<script lang="ts">
//@ts-nocheck
    import { onMount } from 'svelte'
    import { audioStore } from '$lib/stores/modalstores'
    import { allWritings } from '$lib/utils/supabase'
    let pens:any
    let audio:any
    let fake = false

    function fauxfake(){
        fake = !fake
    }

    audioStore.subscribe(value => audio = value)
    onMount(async() => {
        pens = await allWritings();
    })

</script>


<div class="rta-grid grid2 right00 screen fullH cushion back">
    <div class="rta-grid colgap300 rowgap100 postgrid">
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-row colgap300 ybetween ticket" href="/word/{item.slug}">
                    <div class="rta-column rowgap100 null w64">
                        <p class="green">{item.type}</p>
                        <h4 class="tt-u">{item.id}-{item.title}</h4>
                        <small>{item.tags}</small>
                    </div>
                    <div class="rta-image w32 height-24">
                        <img src={item.image} alt={item.title}/>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-writings.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake} />
        <h3 class="tt-u">word</h3>
        <p class="grey">I write on history, civilization and Dharma. Some of it isn't bad.</p>
    </div>
</div>

<style lang="sass">


.ticket
    padding: 20px
    border-radius: 4px


</style>