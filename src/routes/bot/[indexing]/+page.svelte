<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { readingMode } from '$lib/stores/globalstores'
    import GPTParser from '$lib/components/GPTParser.svelte'
    import Pagination from '$lib/components/Pagination.svelte'
    import Prism from 'prismjs';
    import '$lib/prismextras.js'
    import '$lib/styles/prismextras.css'
    import ChevFRight from '$lib/icons/ChevFRight.svelte'
    import ChevFLeft from '$lib/icons/ChevFLeft.svelte'
    import ChevRight from '$lib/icons/ChevRight.svelte'

    import { thisChat } from '$lib/utils/supabase'

    export let data

    let chatStream:any	
    let theme:any   
    let noC:any
    let offC:any
    let prevID:number
    let nextID:number
    let prevPost:any
    let nextPost:any

    onMount(async() => {
        noC = data.indexing
        chatStream = await thisChat(noC)
        Prism.highlightAll();
    })

</script>


<AppShell>
    <div slot="main" class="rta-column rowgap200">
        {#if chatStream && chatStream.length > 0}
            {#each chatStream as item, i}
                <pre class="rta-column breaker">
                    <GPTParser response={item.value}/>
                </pre>
            {/each}
        {/if}
    </div>
    <div slot="side" class="rta-column xstretch fullW rowgap300 null">
        <h5 class="tt-u p-left-32">{data.indexing}-{data.title.replace('.','')}</h5>
        <small class="grey p-left-32 p-bot-32 bord-bot">{data.theme}</small>
        <div class="p-bot-32 p-left-32">
            <Pagination>
                <a href="/bot/{data.previd}" slot="prev" class="blank-button">
                    <ChevFLeft/>
                </a>
                <a href="/bot/{data.nextid}" slot="next" class="blank-button">
                    <ChevFRight/>
                </a>
            </Pagination>
        </div>
    </div>

</AppShell>
