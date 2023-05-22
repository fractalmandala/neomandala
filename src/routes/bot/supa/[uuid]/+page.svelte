<script lang="ts">

    import { onMount } from 'svelte'
    import { thisUUID } from '$lib/utils/supabase'
    export let data

    let uuids:any

    onMount(async() => {
        uuids = await thisUUID(data.uuid)
    })

</script>


<h1>{data.uuid}</h1>
{#if uuids && uuids.length > 0}
    {#each uuids as item}
        <p>{item.title}</p>
        <p>{item.content}</p>
    {/each}
{/if}