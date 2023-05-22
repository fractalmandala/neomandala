<script lang="ts">

    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { clickOutsideAction } from '$lib/utils/clickoutside'
    import { chipStore, hideChip } from '$lib/stores/modalstores';
    import Info from '$lib/icons/Info.svelte'

    let isShown:any, title:string, component:any
    let dimension = 32

    const unsubscribe = chipStore.subscribe(value => {
        ({ isShown, title, component } = value);
    });

    function handleCloseClick() {
        hideChip();
    }

    function handleOverlayClick(e:any) {
        if (e.target === e.currentTarget) {
        hideChip();
        }
    }

    $: if ( isShown === true ) {
        setTimeout(() => {
            isShown = false
        }, 2000)
    }


  onMount(() => {
    return unsubscribe;
  });

</script>

{#if isShown}
<div class="chip rta-column rowgap100 null" transition:fly={{ y: -160 }} use:clickOutsideAction on:clickOutside={handleCloseClick}>
        <div class="rta-column rowgap50 actualchip ycenter">
            <Info dimension={dimension}/>
            <small>{title}</small>
        </div>
</div>
{/if}

<style lang="sass">

.chip
    position: fixed
    top: 0
    height: 128px
    left: 0
    width: 100vw
    background: transparent
    align-items: center
    justify-content: center



</style>
