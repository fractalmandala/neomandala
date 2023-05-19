<script lang="ts">

    import { onMount } from 'svelte'
    import { audioStore } from '$lib/stores/modalstores'
    import { allWritings } from '$lib/utils/localpulls'
    let pens:any
    let audio:any

    audioStore.subscribe(value => audio = value)
    onMount(async() => {
        pens = await allWritings();
    })

</script>


<div class="rta-grid grid2 right00 screen fullH cushion back">
    {#if pens && pens.length > 0}
        <div class="rta-grid colgap300 rowgap100 seven">
            {#each pens as item}
                <a class="rta-column ybetween ticket" href="{item.linkpath}">
                    <div class="rta-column rowgap100 null">
                        <p>{item.meta.type}</p>
                        <h4 class="tt-c">{item.meta.title}</h4>
                        <small>{item.meta.tags}</small>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-writings.webp" alt="writing" on:mouseover={() => audio.play()} />
        <h3 class="tt-u">word</h3>
        <p class="grey">I write on history, civilization and Dharma. Some of it isn't bad.</p>
    </div>
</div>

<style lang="sass">


.ticket
    background: var(--background)
    padding: 20px
    border-radius: 4px


</style>