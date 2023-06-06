<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showModal } from '$lib/stores/modalstores';
	export let data;
	let fullHeight = false;

	function toggleHeight() {
		fullHeight = !fullHeight;
	}

	function handleClick() {
		showModal('CAUTION!', 'mes', data.id);
	}

	onMount(async () => {
		await tick();
		Prism.highlightAll();
	});
</script>

<div class="grot">
	<h4>{data.title}</h4>
	<div class="rta-row between bord-bot p-bot-32">
		<div class="rta-row colgap100">
			<div class="labeller lab3"><a href="/code">CODE - {data.id}</a></div>
			<div class="labeller lab1">{data.uuidtext}</div>
			<div class="labeller lab2">{data.tags}</div>
			<button class="blank-button labeller lab4" on:click={handleClick}>DELETE</button>
		</div>
		<button class="blank-button lab5" use:clickToCopyAction={data.content}>COPY</button>
	</div>
	<pre class="language-{data.uuidtext}" class:fully={fullHeight}>
		<code>
			{data.content}
		</code>
	</pre>
	<button class="genbutton" on:click={toggleHeight}>
		{#if fullHeight}
			Contract
		{:else}
			Expand
		{/if}
	</button>
</div>

<style lang="sass">

h4
	margin: 0	

a
	&:hover
		color: #10D56C

pre
	white-space: pre-line
	max-width: 50vw
	height: 240px
	@media screen and (max-width: 1023px)
		max-width: 90vw

pre.fully
	height: 100%

.labeller
	text-transform: uppercase
	font-size: 12px
	padding: 2px 6px

.lab1
	background: var(--onlyblack)
	color: white

.lab2
	background: var(--greyish)
	color: white

.lab3
	color: #10D56C
	border: 1px solid #10D56C
	&:hover
		background: #10D56C
		color: white
		a
			color: white

.lab4
	color: var(--greyish)
	border: 1px solid var(--greyish)
	&:hover
		background: #fe4a49
		color: white

.lab5
	background: #FFD600
	color: white
	text-transform: uppercase
	font-size: 12px
	padding: 2px 6px


</style>
