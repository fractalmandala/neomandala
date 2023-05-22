<script lang="ts">
//@ts-nocheck
    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { audioStore } from '$lib/stores/modalstores'
    import { readingMode } from '$lib/stores/globalstores'
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



<AppShell>
    <div slot="main">
        <div class="rta-grid grid2 colgap300 rowgap600">
        {#if pens && pens.length > 0}
            {#each pens as item}
                <a class="rta-row colgap300 stay ybetween ticket" href="/word/{item.slug}">
                    <div class="rta-column rowgap100 null w64">
                        <p class="green">{item.type}</p>
                        <h5 class="tt-c special">{item.id}-{item.title}</h5>
                        <small class="grey">{item.tags}</small>
                    </div>
                    <div class="rta-image w32 height-24">
                        <img src={item.image} alt={item.title}/>
                    </div>
                </a>
            {/each}
        {/if}
        </div>
    </div>
    <div slot="side" class="rta-column column-row xstretch fullW rowgap300 null">
        <img class="jello-vertical" src="/images/k-writings.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake} />
        <div class="rta-column rowgap200 bord-bot p-bot-32 p-left-32 w64">
            <h6 class="tt-u">word</h6>
            <small class="grey">I write on history, civilization and Dharma. Some of it isn't bad.</small>
        </div>
    </div>

</AppShell>
