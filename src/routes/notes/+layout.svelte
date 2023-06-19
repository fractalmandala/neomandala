<script lang="ts">
	import Shell from '$lib/design/AppShell.svelte';
	import { allWriteups } from '$lib/dash/notesutil';
	import Acco from '$lib/design/MandAccordionItem.svelte';
	import Acco2 from '$lib/design/MandAccordionItem.svelte';

	let altgrid = true;
</script>

<Shell {altgrid}>
	<div slot="left" class="rta-column rowgap100 onleft" data-lenis-prevent class:small={altgrid}>
		<Acco>
			Janapada
			<div slot="body" class="rta-column">
				{#if $allWriteups && $allWriteups.length > 0}
					{#each $allWriteups as item}
						<a href="/jp/{item.title}"><p>{item.title}</p></a>
					{/each}
				{/if}
			</div>
		</Acco>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

a 
	p
		font-size: 14px
	&:hover
		color: #10D56C

</style>
