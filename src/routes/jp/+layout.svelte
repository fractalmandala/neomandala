<script lang="ts">
	import { allWriteups } from '$lib/dash/notesutil';
	import '$lib/styles/tiptap.sass';
</script>

<div class="newshell">
	<div class="shellleft rta-column" data-lenis-prevent>
		<div class="forheight rta-column rowgap100">
			<a href="/jp"><p>Main</p></a>
			{#if $allWriteups && $allWriteups.length > 0}
				{#each $allWriteups as item}
					{#if item.type === 'janapada'}
						<a href="/jp/{item.title}"><p>{item.title}</p></a>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
	<div class="shellmain rta-column janapadashell">
		<slot />
	</div>
</div>

<style lang="sass">

p
	color: var(--texttwo)
	&:hover
		color: #10D56C
	

.newshell
	display: grid
	grid-auto-flow: row
	.shellleft
		grid-area: shellleft
	.shellmain
		grid-area: shellmain
	@media screen and (min-width: 1024px)
		grid-template-columns: 280px 1fr
		grid-template-areas: "shellleft shellmain"
		min-height: calc(100vh - 192px)
		.shellleft, .shellmain
			padding: 40px
		.shellleft
			width: 280px
		.shellmain
			width: calc(100vw - 280px)

</style>
