<script lang="ts">
	import { onMount } from 'svelte';
	import { notesDiary, deleteNoteItem, getNoteById } from '$lib/dash/notesutil';
	import { slide } from 'svelte/transition';
	import NotesForm from '$lib/dash/NotesForm.svelte';
	import Trash from '$lib/design/iconset/trash.svelte';

	let isNote = Array(50).fill(false);
	let content;

	function openNote(index: number) {
		isNote[index] = !isNote[index];
		for (let i = 0; i < isNote.length; i++) {
			if (i !== index && isNote[i] === true) {
				isNote[i] = false;
			}
		}
	}
</script>

<div class="rta-column pagesection">
	<div class="stickies rta-grid grid4 bord-bot p-bot-32">
		{#if $notesDiary && $notesDiary.length > 0}
			{#each $notesDiary as note, i}
				<div>
					<button class="grot null blank-button ta-l" on:click={() => openNote(i)}>
						<h6>{note.title}</h6>
					</button>
					<div class="font null">
						<cite>{note.id}</cite>
					</div>
				</div>
			{/each}
		{/if}
	</div>
	{#if $notesDiary && $notesDiary.length > 0}
		{#each $notesDiary as note, i}
			{#if isNote[i]}
				<div class="opened p-top-32 bord-bot p-bot-64 p-all-16" transition:slide|global>
					<div class="rta-row null p-top-32 ycenter">
						<div class="thecirc" />
						<div class="grot null">
							<h5 class="tt-c">{note.title}</h5>
							<cite>{note.timestamp}</cite>
						</div>
					</div>
					<div class="font">
						<pre>{note.content}</pre>
						<button class="blank-button" on:click={() => deleteNoteItem(note.id)}>
							<cite style="color: #fe4a49">DELETE</cite>
						</button>
					</div>
				</div>
			{/if}
		{/each}
	{/if}

	<div class="rta-row colgap200 p-top-32">
		<NotesForm />
	</div>
</div>

<style lang="sass">

.font
	pre
		white-space: pre-line

.opened
	.font
		padding-left: 2.4vw

.rta-row
	column-gap: 1.6vw
	.thecirc
		height: 12px
		width: 12px
		border-radius: 50%
		background: #10D56C

</style>
