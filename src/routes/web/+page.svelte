<script lang="ts">
	import { onMount } from 'svelte';
	import { allWebdev } from '$lib/utils/localpulls';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	let pens: any;

	onMount(async () => {
		pens = await allWebdev();
	});
</script>

<div
	class="rta-grid grid4 colgap400 rowgap400 x00"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	{#if pens && pens.length > 0}
		{#each pens as item}
			<a class="rta-column ybetween rowgap400 ticket height-16" href={item.linkpath}>
				<div class="rta-column rowgap100 null p-all-16 ticket2 height-16">
					<h5 class="white tt-c hover">{item.meta.id} - {item.meta.title}</h5>
					<p>{item.meta.type} | {item.meta.tags}</p>
				</div>
			</a>
		{/each}
	{/if}
</div>

<style lang="sass">

.x00
	padding: 88px 32px 64px 32px

.leveltwo.x00
	.ticket, .ticket2
		width: 100%
		border-radius: 6px
	.height-16
		height: max-content

.ticket
	background-image: linear-gradient(163deg, rgba(255, 255, 217, 1) 0%, rgba(255, 255, 255, 1) 100%) 
	border-radius: 20px
	width: 256px
	height: 186px
	transition: all .3s 
	&:hover 
		box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30) 
		background-image: linear-gradient(163deg, rgba(255, 255, 217, 1) 0%, rgba(255, 255, 255, 1) 100%) 

.ticket2
	background-color: #1a1a1a 
	width: 256px
	height: 186px
	transition: all .2s
	border-radius: 20px
	transform: scale(0.998)
	&:hover 
		transform: scale(0.98) 
		border-radius: 20px 


</style>
