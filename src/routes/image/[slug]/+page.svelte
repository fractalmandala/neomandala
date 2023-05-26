<script lang="ts">

    import { onMount } from 'svelte'
	import AppShell from '$lib/design/AppShell.svelte';
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
    import { thisImage } from '$lib/utils/supabase'

    let nextImage:any
    let nextID:any

    export let data

    onMount(async() => {
        nextID = data.id - 1
        nextImage = await thisImage(nextID)
    })

</script>


<div class="rta-column"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="rta-image">
        <img src={data.link} alt={data.id}/>
    </div>


</div>

<style lang="sass">

.rta-image
    margin-top: 56px
    height: 120vh
    img
        object-fit: cover


</style>