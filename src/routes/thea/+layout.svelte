<script lang="ts">
	import { onMount } from 'svelte';
	import Shell from '$lib/design/ShellTwo.svelte';
	import { allThea } from '$lib/utils/supastream';
	import '$lib/styles/tiptap.sass';
	import Refresh from '$lib/icons/Refresh.svelte';

	let altgrid = true;
	let theas: any;

	onMount(async () => {
		theas = await allThea();
	});
</script>

<Shell>
	<div slot="side" class="rta-column sidos">
		<button class="blank-button ta-l">
			<Refresh />
		</button>
		<div class="paddero">
			<p class="tt-u p-top-16 p-bot-16">
				<a href="/thea">Thea</a>
			</p>
			<div class="rta-column rowgap100">
				{#if theas && theas.length > 0}
					{#each theas as item}
						<p class="tt-c">
							<a href="/thea/{item.title}">{item.title}</a>
						</p>
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

.sidos
	height: 72vh
	position: sticky
	top: 40px
	.blank-button
		height: 40px
		border-bottom: 1px solid var(--contraster)
		@media screen and (min-width: 1024px)
			padding-left: 32px

.paddero
	@media screen and (min-width: 1024px)
		padding-left: 32px

p, p a
	font-family: 'CommitMono', sans-serif

p a
	color: var(--texttwo)
	&:hover
		color: #10D56C

</style>
