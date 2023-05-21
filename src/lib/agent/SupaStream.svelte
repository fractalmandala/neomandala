<script lang="ts">

    import { onMount } from 'svelte'
    import supabase from '$lib/utils/supabase'


    let data:any = [];

    onMount(() => {
        supabase
        .channel('any')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'amrit-notes' }, payload => {
        data = [...data, payload];
        })
        .subscribe();
        return data
    });

</script>

<ul>
{#each data as message}
  <li>{message.title}</li>
{/each}
</ul>
