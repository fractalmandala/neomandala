<script lang="ts">
	import { onMount } from 'svelte';
	import { themeMode } from '$lib/stores/globalstores';
	import { fly } from 'svelte/transition';
	import Info from '$lib/icons/Info.svelte';
	import { showNote, noteStore } from '$lib/dash/alerts';

	let isShown: any, title: string, status: boolean;
	let dimension = 20;
	let green = '#10D56C';
	let red = '#fe4a49';

	const unsubscribe = noteStore.subscribe((value) => {
		({ isShown, title, status } = value);
	});

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
		class:light={$themeMode}
		class:dark={!$themeMode}
	>
		<div class="rta-row colgap100 xcenter actualchip ycenter">
			{#if status === false}
				<Info {dimension} color={green} />
				<p class="grot tt-u good">{title}</p>
			{/if}
			{#if status === true}
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
	z-index: 1000
	
p.good
	padding: 2px 4px
	font-size: 10px
	border-radius: 2px


p.bad
	padding: 2px 4px
	font-size: 10px
	border-radius: 2px

.light
	p
		color: #272727

.dark
	p
		color: #FFFFFF


</style>
