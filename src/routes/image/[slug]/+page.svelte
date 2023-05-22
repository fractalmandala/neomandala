<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { thisImage } from '$lib/utils/supabase'
    import { readingMode } from '$lib/stores/globalstores'

    let nextImage:any
    let nextID:any

    export let data

    onMount(async() => {
        nextID = data.id - 1
        nextImage = await thisImage(nextID)
    })

</script>


<AppShell>
    <div slot="main" class="rta-image">
        <img src={data.link} alt={data.id}/>
    </div>
    <div slot="side" class="rta-column column-row xstretch fullW rowgap300 null">
        <h5 class="tt-u p-left-32 bord-bot p-bot-32">{data.id}</h5>
        {#if nextImage && nextImage.length > 0}
            {#each nextImage as item}
                <a href="/image/{item.slug}" class="rta-image back" style="background-image: url('{item.link}')">
                    <img src={item.link} alt={item.id}/>
                </a>
            {/each}
        {/if}
    </div>

</AppShell>

<style lang="sass">



</style>