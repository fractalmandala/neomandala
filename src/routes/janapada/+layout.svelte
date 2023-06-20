<script lang="ts">
	import { onMount } from 'svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { allJanapada } from '$lib/utils/supastream';
	import '$lib/styles/tiptap.sass';

	let novels: any;

	onMount(async () => {
		novels = await allJanapada();
	});
</script>

<Shell>
	<div slot="side" class="rta-column rowgap50">
		{#if novels && novels.length > 0}
			{#each novels as item}
				<p>
					<a href="/janapada/{item.title}">{item.title}</a>
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
