<script lang="ts">
	import { onMount } from 'svelte';
	import { showModal } from '$lib/stores/modalstores';
	import Edits from '$lib/components/FinalTip.svelte';
	import { marked } from 'marked';
	import Gridder from '$lib/components/Gridder.svelte';
	export let data;

	function handleClick() {
		showModal('CAUTION!', 'mes', data.id);
	}
</script>

<div class="rta-grid">
	<div class="grot null">
		<h3>{data.title}</h3>
	</div>
	<div class="rta-row bord-bot p-bot-32">
		<div class="labeller lab3"><a href="/doc">DOC</a></div>
		<div class="labeller lab1">DRAFT</div>
		<div class="labeller lab2">{data.tags}</div>
		<button class="blank-button labeller lab4" on:click={handleClick}>DELETE</button>
	</div>
	<pre class="fetchedtext grot">
		{@html marked.parse(data.content)}
	</pre>
</div>

<style lang="sass">

h3
	margin: 0


.fetchedtext
	display: flex
	flex-direction: column
	row-gap: 20px

.rta-row
	column-gap: 8px

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

.lab4
	color: var(--greyish)
	border: 1px solid var(--greyish)
	&:hover
		background: #fe4a49
		color: white


</style>
