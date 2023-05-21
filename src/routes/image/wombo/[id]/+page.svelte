<script lang="ts">

    import { onMount } from 'svelte'
    import { readingMode } from '$lib/stores/globalstores'


    export let data

</script>



<div class="rta-grid grid2 right00 screen fullH">
    <div class="rta-column writing">
        <img src={data.link} alt={data.id}/>
    </div>
    <div class="rta-column titlebox ybetween" class:invisible={$readingMode}>
        <h4 class="tt-u">{data.id}</h4>
    </div>
</div>

<style>

.rta-column img {
    object-fit: cover;
    width: 100%;
    height: 100%
}

.writing {
    height: 98vh
}

</style>