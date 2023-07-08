<script lang="ts">
	//@ts-nocheck
	import { onMount, tick, afterUpdate } from 'svelte';
	import {
		breakZero,
		breakOne,
		breakTwo,
		noteName,
		showSave,
		hideSave,
		headTitle,
		themeMode
	} from '$lib/stores/globalstores';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';
	import { showNote } from '$lib/dash/alerts';
	import Copy from '$lib/design/iconset/copy.svelte';
	import { showModal } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';
	import Pinned from '$lib/design/iconset/pinned.svelte';
	export let data;
	let fullHeight = false;
	let isPinned = false;

	async function pinItem() {
		const { error } = await supabase.from('amrit-notes').update({ bool: true }).eq('id', data.id);
		if (error) {
			showNote('error', true);
		} else {
			showNote('pinned', false);
		}
	}

	async function unpinItem() {
		const { error } = await supabase.from('amrit-notes').update({ bool: false }).eq('id', data.id);
		if (error) {
			showNote('error', true);
		} else {
			showNote('unpinned', false);
		}
	}

	function toggleHeight() {
		fullHeight = !fullHeight;
	}

	function handleCopyDone() {
		showNote('copied', false);
	}

	function handleCopyError() {
		showNote('error', true);
	}

	function handleClick() {
		showModal('CAUTION!', 'mes', data.id);
	}

	onMount(async () => {
		await tick();
		Prism.highlightAll();
	});
</script>

<div
	class="grot rta-column rowgap300"
	class:lzero={$breakZero}
	class:lone={$breakOne}
	class:ltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-row ycenter between stripunos">
		<div class="rta-row ycenter colgap100">
			{#if data.bool === true}
				<button class="blank-button" on:click={unpinItem}>
					<Pinned dimension={16} />
				</button>
			{/if}
			<div class="notetitle">{data.title}</div>
		</div>
		<div class="rta-row colgap100">
			<div class="labeller lab2">{data.tags}</div>
			<button class="blank-button labeller lab4" on:click={handleClick}>DELETE</button>
			<a href="/pad/edit/{data.id}"><button class="blank-button labeller lab4">EDIT</button></a>
			{#if data.bool !== true}
				<button class="blank-button labeller lab3" on:click={pinItem}>Pin</button>
			{/if}
		</div>
	</div>
	<div class="notecontainer rta-column">
		<div class="rta-row between strip ycenter">
			<div class="tt-u">{data.uuidtext}</div>
			<button
				class="blank-button"
				use:clickToCopyAction={data.content}
				on:copy-done={handleCopyDone}
				on:copy-error={handleCopyError}
			>
				<Copy />
			</button>
		</div>
		<pre class="language-{data.uuidtext}">
		<code>
			{data.content}
		</code>
		</pre>
	</div>
</div>

<style lang="sass">

.strip
	div
		font-size: 12px
		color: var(--default)

.lzero, .lone
	.notecontainer
		padding-left: 32px

.lzero
	.strip
		width: 56vw
		padding: 8px

pre
	white-space: pre-line
	padding-top: 0
	padding-bottom: 0
	border-radius: 5px
	transition: height 0.12s ease
	@media screen and (min-width: 1024px)
		width: 56vw
	@media screen and (max-width: 1023px)
		max-width: 96vw

.dark
	pre, .strip, .lowstrip
		background: #111111
	.lowstrip
		border-top: 1px solid #575757

.light
	pre, .strip, .lowstrip
		background: #EFEFEF
	.lowstrip
		border-top: 1px solid #d7d7d7

.labeller
	text-transform: uppercase
	font-size: 10px
	padding: 1px 4px

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

.lab5
	background: #FFD600
	color: white
	text-transform: uppercase
	font-size: 12px
	padding: 2px 6px


</style>
