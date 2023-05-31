<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { noteStore, hideNote } from '$lib/dash/alerts';
	import Info from '$lib/icons/Info.svelte';

	let isShown: any, title: string, color: boolean;
	let dimension = 20;
	let green = '#10D56C';
	let red = '#fe4a49';

	const unsubscribe = noteStore.subscribe((value) => {
		({ isShown, title, color } = value);
	});

	function handleCloseClick() {
		hideNote();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hideNote();
		}
	}

	$: if (isShown === true) {
		setTimeout(() => {
			isShown = false;
		}, 2000);
	}

	onMount(() => {
		return unsubscribe;
	});
</script>

{#if isShown}
	<div
		class="chipper rta-column rowgap100 null"
		transition:fly={{ x: 160 }}
		use:clickOutsideAction
		on:clickOutside={handleCloseClick}
	>
		<div class="rta-row colgap100 xcenter actualchip ycenter">
			{#if color === true}
				<Info {dimension} color={green} />
				<p class="grot tt-u good">{title}</p>
			{/if}
			{#if color === false}
				<Info {dimension} color={red} />
				<p class="grot tt-u bad">{title}</p>
			{/if}
		</div>
	</div>
{/if}

<style lang="sass">

.chipper
    position: fixed
    bottom: 16px
    height: 128px
    right: 16px
    width: 120px
    background: transparent
    align-items: center
    justify-content: center
    text-align: center
	
p.good
    background: #10D56C
    padding: 2px 4px
    font-size: 10px
    border-radius: 2px
    color: white

p.bad
    background: #fe4a49
    padding: 2px 4px
    font-size: 10px
    border-radius: 2px
    color: white


</style>
