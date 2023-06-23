<script lang="ts">

    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { clickOutsideAction } from '$lib/utils/clickoutside'
    import { toastStore, hideToast } from '$lib/stores/modalstores';
    import Close from '$lib/icons/Close.svelte'
    import Info from '$lib/icons/Info.svelte'

    let isShown:any, title:string, component:any
    let dimension = 20

    const unsubscribe = toastStore.subscribe(value => {
        ({ isShown, title, component } = value);
    });

    function handleCloseClick() {
        hideToast();
    }

    function handleOverlayClick(e:any) {
        if (e.target === e.currentTarget) {
        hideToast();
        }
    }

    $: if ( isShown === true ) {
        setTimeout(() => {
            isShown = false
        }, 5000)
    }


  onMount(() => {
    return unsubscribe;
  });

</script>

{#if isShown}
<div class="toast rta-column rowgap100 null" transition:fly|global={{ x: 200 }} use:clickOutsideAction on:clickOutside={handleCloseClick}>
    <div class="rta-row fullW between ytop">
        <div class="rta-row colgap100 ycenter">
            <Info dimension={dimension}/>
            <p><strong>{title}</strong></p>
        </div>
        <button class="blank-button" on:click={handleCloseClick}>
            <Close dimension={dimension}/>
        </button>
    </div>
    {#if component}
        {component}
    {/if}
</div>
{/if}

<style lang="sass">

.toast
    position: fixed
    padding: 12px
    bottom: 32px
    right: 32px
    width: 240px
    min-height: 48px
    background: var(--opposite)
    border: 1px solid var(--background)
    border-radius: 6px
    p
        margin: 0
        padding: 0



</style>
