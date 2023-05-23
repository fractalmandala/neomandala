<script lang="ts">

    import { onMount } from 'svelte'
    import { readingMode } from '$lib/stores/globalstores'
    import ChevRight from '$lib/icons/ChevRight.svelte'
    import Prism from 'prismjs';
    import '$lib/styles/prismextras.css'
    import '$lib/styles/prismtwo.css'
    export let data

    onMount(async() => {
        Prism.highlightAll();
    })

</script>



    <div class="rta-column padding-l0">
        <h2 class="gradienter">{data.title}</h2>
        <svelte:component this={data.content}/>
    </div>
