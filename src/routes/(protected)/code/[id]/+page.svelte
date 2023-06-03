<script lang="ts">
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showModal } from '$lib/stores/modalstores';
	export let data;

	function handleClick() {
		showModal('CAUTION!', 'mes', data.id);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-dark.min.css"
		integrity="sha512-y6rcKLYkttB9ZUBaz0IsncWFo1VoqISrcMY6J1i6Nb9WB9jRrpll8zjt5e1/naZHyXFoR/1VlH72+2VJ1Uzh7A=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<div class="grot rta-grid p-top-64">
	<div class="grot null">
		<h3>{data.title}</h3>
	</div>
	<div class="rta-row between bord-bot p-bot-32">
		<div class="rta-row colgap100">
			<div class="labeller lab3"><a href="/code">CODE - {data.id}</a></div>
			<div class="labeller lab1">{data.uuidtext}</div>
			<div class="labeller lab2">{data.tags}</div>
			<button class="blank-button labeller lab4" on:click={handleClick}>DELETE</button>
		</div>
		<button class="blank-button lab5" use:clickToCopyAction={data.content}>COPY</button>
	</div>
	<div class="holdspre">
		<pre>{data.content}</pre>
	</div>
</div>

<style lang="sass">

.rta-grid.grot
	@media screen and (min-width: 769px)
		width: 86%

a
	&:hover
		color: #10D56C

.holdspre
	background: var(--contraster)
	border-radius: 8px
	padding: 24px


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
