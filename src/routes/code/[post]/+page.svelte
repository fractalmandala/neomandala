<script lang="ts">

    import { onMount } from 'svelte'
    import Prism from 'prismjs';
    import '$lib/prismextras.js'
    import '$lib/styles/prismextras.css'
    let theme:any

    export let data

    onMount(async() => {
        theme = data.type
        Prism.highlightAll();
    })

</script>



<div class="rta-grid grid2 right00 screen fullH cushion">
    <div class="rta-column writing">
        <svelte:component this={data.content}/>
    </div>
    <div class="rta-column titlebox">
        <h4 class="tt-u">{data.title}</h4>
    </div>
</div>
