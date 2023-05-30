<script lang="ts">
	import { onMount } from 'svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { articleDrafts } from '$lib/utils/supabase';

	let notes: any;

	onMount(async () => {
		notes = await articleDrafts();
	});
</script>

<div
	class="thepad minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="liner" />
	<div class="theside null">
		<h6>
			<a href="/pad"> All Notes </a>
		</h6>
		{#if notes && notes.length > 0}
			{#each notes as item}
				<p>
					<a class="hover" href="/pad/{item.uuidtext}">
						{item.title}
					</a>
				</p>
			{/each}
		{/if}
	</div>
	<div class="notepad rta-column">
		<slot />
	</div>
</div>

<style lang="sass">

.light.levelzero
	.liner
		background: white
	.theside
		border-right: 1px solid #f2f2f2
		background: white
	.notepad
		background: white

.dark.levelzero
	.liner
		background: transparent
	.theside
		background: #121212
		border-right: 1px solid #272727
	.notepad
		background: #171717

.levelzero.thepad
	display: grid
	grid-auto-flow: row
	grid-template-columns: 280px 1fr
	grid-template-areas: "liner liner" "theside themain"
	grid-template-rows: 1px auto
	.liner
		grid-area: liner
		height: 56px
		width: 100%
		position: sticky
		z-index: 699
		top: 0
	.theside
		grid-area: theside
		width: 280px
		height: 100vh
		display: flex
		flex-direction: column
		position: sticky
		top: 0
		overflow-y: scroll
		padding-top: 88px
		padding-left: 32px
		h6
			padding-bottom: 12px
		p
			font-size: 16px
			padding-bottom: 6px
			text-transform: capitalize
			font-family: 'Nohemi', sans-serif
	.notepad
		grid-area: themain

.leveltwo.thepad, .levelone.thepad
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-areas: "theside" "themain"
	grid-template-rows: auto
	.liner
		display: none
	.theside
		grid-area: theside
		width: 100%
		height: 64px
		margin-top: 88px
		overflow-y: hidden
		padding-left: 24px
	.notepad
		grid-area: themain

</style>
