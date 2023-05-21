<script lang="ts">

    import { onMount } from 'svelte'
    import { readingMode } from '$lib/stores/globalstores'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Prism from 'prismjs';
    import '$lib/prismextras.js'
    import '$lib/styles/prismextras.css'

    export let data

    onMount(async() => {
        Prism.highlightAll();
    })

</script>



<div class="rta-grid grid2 right00 screen fullH cushion">
    <div class="rta-column writing postis codeis p-top-64">
        
        <svelte:component this={data.content}/>
    </div>
    <div class="rta-column titlebox" class:invisible={$readingMode}>
        <a href="/build" class="rta-row null ycenter">
            <small>Build</small>
            <ChevRight/>
        </a>
        <h4 class="tt-u">{data.title}</h4>
    </div>
</div>
