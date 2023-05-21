<script lang="ts">

    import { drawerStore, hideDrawer } from '$lib/stores/modalstores'
    import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition'
    import SearchBox from '$lib/components/SearchBox.svelte'
 
    let isShown:any, component:any

    const unsubscribe = drawerStore.subscribe(value => {
        ({ isShown, component } = value);
    }); 

    onMount(() => {
        return unsubscribe;
    });

    function handleCloseClick() {
        hideDrawer();
    }

    function handleOverlayClick(e:any) {
        if (e.target === e.currentTarget) {
            hideDrawer();
        }
    }

</script>

{#if isShown}
<div class="drawer-overlay" on:click={handleOverlayClick} on:keydown={handleOverlayClick}
    transition:slide={{ axis: 'x', duration: 600}}
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    >
  <div class="drawer">
   {#if component}
     <div class="componentslot">
       <svelte:component this={component} />
     </div>
   {/if}
  <button class="whitebutton" on:click={handleCloseClick}>Close</button>
    <div class="rta-column fullH m-top-16">
        <SearchBox/>
    </div>
 </div>
</div>
{/if}

<style lang="sass">

.drawer-overlay
    position: fixed
    display: flex
    flex-direction: column
    background-image: url('/images/blob.png')
    background-position: center center
    background-size: cover
    background-repeat: no-repeat
    .drawer
        height: 100%
        width: 100%
        background: rgba(0,0,0,0.68)
        padding: 32px

.drawer-overlay.levelzero
    top: 0
    right: 0
    width: 312px
    height: 100vh

.drawer-overlay.levelone
    top: 0
    right: 0
    width: 280px
    height: 100vh

.drawer-overlay.leveltwo
    top: 64px
    right: 0
    width: 100vw
    min-height: calc(100vh - 64px)
    .drawer
        min-height: calc(100vh - 64px)
        height: 100%


</style>