<script lang="ts">

    import { onMount } from 'svelte'
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
	import AppShell from '$lib/design/AppShell.svelte';
    import GPTParser from '$lib/components/GPTParser.svelte'
    import Pagination from '$lib/components/Pagination.svelte'
    import Prism from 'prismjs';
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


<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="shellmain rta-column rowgap200">
        {#if chatStream && chatStream.length > 0}
            {#each chatStream as item, i}
                <pre class="rta-column breaker">
                    <GPTParser response={item.value}/>
                </pre>
            {/each}
        {/if}
    </div>
    <div class="shellside rta-column xstretch fullW rowgap300 null">
        <h4 class="tt-u">{data.indexing}-{data.title.replace('.','')}</h4>
        <small class="grey p-bot-32 bord-bot">{data.theme}</small>
        <div class="p-bot-32">
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

</div>
