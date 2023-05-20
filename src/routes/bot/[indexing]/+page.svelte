<script lang="ts">

    import { onMount } from 'svelte'
    import GPTParser from '$lib/components/GPTParser.svelte'
    import Prism from 'prismjs';
    import '$lib/prismextras.js'
    import '$lib/styles/prismextras.css'
    let md = '# hello'

    import { thisChat } from '$lib/utils/supabase'

    export let data

    let chatStream:any	
    let theme:any   
    let noC:any
    let offC:any

    onMount(async() => {
        noC = data.indexing
        chatStream = await thisChat(noC)
        Prism.highlightAll();
    })

</script>


<div class="rta-grid grid2 right00 screen fullH cushion colgap600">
    <div class="rta-column writing">
        {#if chatStream && chatStream.length > 0}
            {#each chatStream as item, i}
                <pre class="rta-column breaker">
                    <GPTParser response={item.value}/>
                </pre>
            {/each}
        {/if}
    </div>
    <div class="rta-column titlebox">
        <h4 class="tt-u">{data.title}</h4>
    </div>
</div>
