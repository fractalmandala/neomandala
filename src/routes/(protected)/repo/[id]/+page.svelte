<script lang="ts">
	import { onMount } from 'svelte';
	import { singleTitle } from '$lib/utils/supabase';
	import Parser from '$lib/agent/Parser.svelte';
	import Clock from '$lib/design/iconset/clock.svelte';
	import { marked } from 'marked';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	export let data;
	let items: any;

	onMount(() => {
		Prism.highlightAll();
		(async () => {
			items = await singleTitle(data.title);
		})();
	});
</script>

<div class="rta-column grot intern">
	<div class="sticksarea">
		<div class="grot null p-bot-8">
			<h5 style="margin: 0">{data.title}</h5>
		</div>
		<div class="rta-row colgap400 p-bot-16">
			<button class="lab1">{data.theme}</button>
			<button class="blank-button labeller lab4">DELETE</button>
		</div>
	</div>
	<div class="rta-column grot p-top-8">
		{#if items && items.length > 0}
			{#each items as item}
				<b class="tt-c" style="color: var(--greyish)">{item.author}</b>
				<Parser response={item.value} />
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.sticksarea
	position: sticky
	z-index: 500
	@media screen and (min-width: 1024px)
		top: 56px
		background: var(--this)
		padding-top: 8px
	@media screen and (max-width: 1023px)
		top: 104px
		background: var(--this)
		padding-top: 8px

.lab1
	font-size: 10px
	font-weight: bold
	text-transform: uppercase
	color: var(--greyish)

.labeller
	text-transform: uppercase
	font-size: 10px
	padding: 1px 4px

.lab4
	color: var(--greyish)
	border: 1px solid var(--greyish)
	&:hover
		background: #fe4a49
		color: white


</style>
