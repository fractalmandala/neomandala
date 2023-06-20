<script lang="ts">
	import { onMount } from 'svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { allThea } from '$lib/utils/supastream';
	import '$lib/styles/tiptap.sass';

	let altgrid = true;
	let theas: any;

	onMount(async () => {
		theas = await allThea();
	});
</script>

<Shell>
	<div slot="side" class="rta-column rowgap50 sonofgod">
		{#if theas && theas.length > 0}
			{#each theas as item}
				<p class="tt-c">
					<a href="/thea/{item.title}">{item.title}</a>
				</p>
			{/each}
		{/if}
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

.sonofgod
	@media screen and (min-width: 1024px)
		height: calc(100vh - 112px)
		overflow-y: scroll
		position: sticky
		top: 112px

p a
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
