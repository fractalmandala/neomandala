<script lang="ts">
	import { themeMode } from '$lib/stores/globalstores';
	import { fileMode, toggleUpload, addNote } from '$lib/dash/fileuploader';
	import { showNoteInput, hideNoteInput, noteInputStore } from '$lib/dash/globalstores';
	import Upload from '$lib/design/iconset/upload.svelte';
	import Chevup from '$lib/design/iconset/chevronsup.svelte';
	import DocAdd from '$lib/design/iconset/fileplus.svelte';

	let isShown: boolean;

	const unsubscribe = noteInputStore.subscribe((value) => {
		({ isShown } = value);
	});

	function handleClose() {
		hideNoteInput();
	}

	function handleAdd() {
		showNoteInput();
	}
</script>

<div
	class="authheader rta-row between ycenter null"
	class:lightmode={$themeMode}
	class:darkmode={!$themeMode}
>
	<div class="rta-row ycenter colgap600">
		{#if isShown}
			<button class="blank-button null rta-row colgap100 ycenter" on:click={handleClose}>
				<Chevup dimension={16} />
				<small class="green tt-u grot">CLOSE Form</small>
			</button>
		{/if}
		{#if !isShown}
			<button class="blank-button null rta-row colgap100 ycenter" on:click={handleAdd}>
				<Upload dimension={16} />
				<small class="green tt-u grot">NEW NOTE</small>
			</button>
		{/if}
		<a class="blank-button null rta-row colgap100 ycenter" href="/pad">
			<DocAdd dimension={16} />
			<small class="green tt-u grot">NEW POST</small>
		</a>
	</div>
	<slot name="signout" />
</div>

<style lang="sass">

.rta-row
	height: 48px
	position: sticky
	top: 0
	right: 0
	z-index: 1000

.lightmode
	background: white
	border-bottom: 1px solid #e7e7e7

.darkmode
	background: #121212
	border-bottom: 1px solid #272727


</style>
