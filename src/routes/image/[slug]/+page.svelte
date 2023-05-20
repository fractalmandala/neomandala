<script lang="ts">

    import { onMount } from 'svelte'
    import { thisImage } from '$lib/utils/supabase'

    let nextImage:any
    let nextID:any

    export let data

    onMount(async() => {
        nextID = data.id - 1
        nextImage = await thisImage(nextID)
    })

</script>



<div class="rta-grid grid2 right00 screen fullH cushion">
    <div class="rta-column writing">
        <img src={data.link} alt={data.id}/>
    </div>
    <div class="rta-column titlebox ybetween">
        <h4 class="tt-u">{data.id}</h4>
        {#if nextImage && nextImage.length > 0}
            {#each nextImage as item}
                <a href="/image/{item.slug}" class="rta-image back" style="background-image: url('{item.link}')">
                    <img src={item.link} alt={item.id}/>
                </a>
            {/each}
        {/if}
    </div>
</div>

<style>

.rta-column img {
    object-fit: cover;
    width: 100%;
    height: 100%
}

.writing {
    height: 90vh
}

</style>