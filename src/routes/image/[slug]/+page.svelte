<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
    import { thisImage } from '$lib/utils/supabase'

    let nextImage:any
    let nextID:any

    export let data

    onMount(async() => {
        nextID = data.id - 1
        nextImage = await thisImage(nextID)
    })

</script>


<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="shellmain rta-image height-80">
        <img src={data.link} alt={data.id}/>
    </div>
    <div class="shellside rta-column column-row fullW rowgap300 null">
        <h5 class="tt-u bord-bot p-bot-32">{data.id}</h5>
        {#if nextImage && nextImage.length > 0}
            {#each nextImage as item}
                <a href="/image/{item.slug}" class="rta-image back" style="background-image: url('{item.link}')">
                    <img src={item.link} alt={item.id}/>
                </a>
            {/each}
        {/if}
    </div>

</div>