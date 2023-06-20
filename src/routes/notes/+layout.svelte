<script lang="ts">
	import { onMount } from 'svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { allNotes } from '$lib/utils/supastream';
	import '$lib/styles/tiptap.sass';

	let altgrid = true;
	let theas: any;

	onMount(async () => {
		theas = await allNotes();
	});
</script>

<Shell>
	<div slot="side" class="rta-column rowgap50">
		<p class="tt-u">
			<a href="/notes">Notes</a>
		</p>
		{#if theas && theas.length > 0}
			{#each theas as item}
				<p class="tt-c">
					<a href="/notes/{item.title}">{item.title}</a>
				</p>
			{/each}
		{/if}
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

p a
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
