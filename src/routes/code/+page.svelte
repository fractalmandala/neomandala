<script lang="ts">

    import { onMount } from 'svelte'
    import { allWebdev } from '$lib/utils/localpulls'
    import { audioStore } from '$lib/stores/modalstores'
    let pens:any
    let audio:any
    audioStore.subscribe(value => audio = value)

    onMount(async() => {
        pens = await allWebdev();
    })

</script>


<div class="rta-grid grid2 right00 screen fullH cushion">
    {#if pens && pens.length > 0}
        <div class="rta-grid grid3 colgap300 rowgap300">
            {#each pens as item}
                <a class="rta-column ybetween rowgap400 ticket" href="{item.linkpath}">
                    <div class="rta-column rowgap200 null">
                        <p>{item.meta.type}</p>
                        <h4 class="tt-u">{item.meta.id} - {item.meta.title}</h4>
                        <small>{item.meta.tags}</small>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
    <div class="rta-column titlebox null">
        <img class="jello-vertical" src="/images/k-webdev.webp" alt="writing" on:mouseover={() => audio.play()}/>
        <h3 class="tt-u">code</h3>
        <p class="grey">Just enough HTML, CSS and JS to have put this site together. And a bit more...</p>
    </div>
</div>