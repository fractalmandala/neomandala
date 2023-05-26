<script lang="ts">

    import { onMount } from 'svelte'
    import AppShell from '$lib/design/AppShell.svelte'
    import Prism from 'prismjs';
    import '$lib/styles/prismextras.css'
    import '$lib/styles/prismtwo.css'
    export let data

    onMount(async() => {
        Prism.highlightAll();
    })

</script>



    <div class="rta-column">
        <h2 class="gradienter">{data.title}</h2>
        <svelte:component this={data.content}/>
    </div>
