<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';
	import { thisImage } from '$lib/utils/supabase';

	let nextImage: any;
	let nextID: any;
	let prevImage: any;
	let prevID: any;

	export let data;
	nextID = data.id + 1;
	prevID = data.id - 1;

	onMount(async () => {
		nextImage = await thisImage(nextID);
		prevImage = await thisImage(prevID);
	});
</script>

<div
	class="rta-column"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<img src={data.link} alt={data.id} />
	{#if prevImage && prevImage.length > 0}
		{#each prevImage as item}
			<a href="/image/{item.slug}" class="blank-button leftbutton">
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24 31.3L26.1 29.2L22.4 25.5H31.5V22.5H22.4L26.1 18.8L24 16.7L16.7 24L24 31.3ZM24 44C21.2667 44 18.6833 43.475 16.25 42.425C13.8167 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05833 11.65 9.875 9.85C11.6917 8.05 13.8167 6.625 16.25 5.575C18.6833 4.525 21.2667 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7333 43.475 29.3167 42.425 31.75C41.375 34.1833 39.95 36.3083 38.15 38.125C36.35 39.9417 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44Z"
						fill="white"
					/>
				</svg>
			</a>
		{/each}
	{/if}
	{#if nextImage && nextImage.length > 0}
		{#each nextImage as item}
			<a href="/image/{item.slug}" class="blank-button rightbutton">
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24 31.3L31.3 24L24 16.7L21.9 18.8L25.6 22.5H16.5V25.5H25.6L21.9 29.2L24 31.3ZM24 44C21.2667 44 18.6833 43.475 16.25 42.425C13.8167 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05833 11.65 9.875 9.85C11.6917 8.05 13.8167 6.625 16.25 5.575C18.6833 4.525 21.2667 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7333 43.475 29.3167 42.425 31.75C41.375 34.1833 39.95 36.3083 38.15 38.125C36.35 39.9417 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44Z"
						fill="white"
					/>
				</svg>
			</a>
		{/each}
	{/if}
</div>

<style lang="sass">

.leveltwo
	img
		margin-top: 6px

.rta-column
	margin: 0
	box-sizing: border-box
	height: 100vh
	position: relative
	padding: 0
	img
		object-fit: cover
	.blank-button
		position: absolute
		background: rgba(0,0,0,0.4)
		backdrop-filter: blur(7px)
		background: rgba(0,0,0,0.4)
		padding-top: 16px
		padding-bottom: 16px
		padding-top: 16px
		z-index: 1000
		&:hover
			svg path
				fill: #10D56c
	.leftbutton
		left: 0
		padding-left: 32px
		bottom: 32px
		padding-right: 16px
	.rightbutton
		right: 0
		bottom: 32px
		padding-right: 32px
		padding-left: 16px


</style>
