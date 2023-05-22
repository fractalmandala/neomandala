<script lang="ts">

    import { onMount } from 'svelte'
	import { allMusic } from '$lib/utils/localpulls'
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
    import { audioStore } from '$lib/stores/modalstores'
   	import Soundclouder1 from '$lib/components/Soundclouder.svelte' 

    let images:any
    let audio:any
    audioStore.subscribe(value => audio = value)
    let fake = false

    function fauxfake(){
        fake = !fake
    }

    onMount(async() => {
        images = await allMusic()
    })

</script>

<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >


    <div class="shellmain rta-grid grid3 colgap100 rowgap300">
        {#if images && images.length > 0}
			{#each images as item, i}
				<div class="rta-column p-all-16">
					<Soundclouder1 soundcloudLink={item.meta.soundcloudLink}/>
				</div>
			{/each}
        {/if}
    </div>
    <div class="shellside  rta-column null" class:invisible={$readingMode}>
        <img class="jello-vertical" src="/images/k-music.webp" alt="writing" on:mouseover={() => audio.play()} on:focus={fauxfake}/>
        <h3 class="tt-u">sound</h3>
        <p class="grey">because electronic music takes us to a place we want to go to...</p>
    </div>

</div>