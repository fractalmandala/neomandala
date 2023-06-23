<script lang="ts">

    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { clickOutsideAction } from '$lib/utils/clickoutside'
    import { alertStore, hideAlert } from '$lib/stores/modalstores';
    import Close from '$lib/icons/Close.svelte'
    import Info from '$lib/icons/Info.svelte'

    let isShown:any, title:string, component:any
    let dimension = 20
    let color = '#fe4a49'

    const unsubscribe = alertStore.subscribe(value => {
        ({ isShown, title, component } = value);
    });

    function handleCloseClick() {
        hideAlert();
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
<div class="toast-overlay rta-row"  transition:fly|global={{ y: -200 }} use:clickOutsideAction on:clickOutside={handleCloseClick}>
<div class="toast rta-column rowgap100 null">
    <div class="rta-row fullW between ytop">
        <div class="rta-row colgap100 ycenter">
            <Info dimension={dimension} color={color}/>
            <p><strong>{title}</strong></p>
        </div>
        <button class="blank-button" on:click={handleCloseClick}>
            <Close dimension={dimension} color={color}/>
        </button>
    </div>
</div>
</div>
{/if}

<style lang="sass">

.toast-overlay
    position: fixed
    top: 64px
    left: 0
    width: 100%
    justify-content: center

.toast
    padding: 12px
    width: 240px
    min-height: 48px
    background: var(--opposite)
    border: 1px solid var(--background)
    border-radius: 6px
    p
        margin: 0
        padding: 0



</style>
