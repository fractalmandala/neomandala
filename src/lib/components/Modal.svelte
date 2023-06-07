<script lang="ts">
	import { modalStore, hideModal } from '$lib/stores/modalstores';
	import { deleteChatSession } from '$lib/gpt/chatstore';
	import { deleteNote } from '$lib/dash/db';
	import supabase from '$lib/utils/supabase';
	import Alert from '$lib/icons/Alert.svelte';
	import Close from '$lib/icons/Close.svelte';
	import { showNote } from '$lib/dash/alerts';
	import { onMount } from 'svelte';

	let isShown: any, title: string, message: string, component: number;
	let color = '#FE4a49';

	async function deleteImage() {
		const { error } = await supabase.from('amrit-gallery').delete().eq('id', component);
		if (error) {
			showNote('no!', false);
		} else showNote('yes', true);
	}

	async function deleteLocalChat() {
		deleteChatSession(message);
		hideModal();
	}

	function handleDeleteClick() {
		deleteNote(component);
		hideModal();
	}

	const unsubscribe = modalStore.subscribe((value) => {
		({ isShown, title, message, component } = value);
	});

	onMount(() => {
		return unsubscribe;
	});

	function handleCloseClick() {
		hideModal();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hideModal();
		}
	}
</script>

{#if isShown}
	<div class="modal-overlay" on:click={handleOverlayClick} on:keydown={handleOverlayClick}>
		<div class="modal null grot">
			<div class="rta-row between ycenter null">
				<div class="rta-row colgap100 ycenter null">
					<Alert />
					<h5>{title}</h5>
				</div>
				<button class="blank-button" on:click={handleCloseClick}>
					<Close {color} />
				</button>
			</div>
			{#if component >= 1 && title !== 'image' && title !== 'snip'}
				<p>This will delete the note number {component}! Are you sure?</p>
				<button class="genbutton red" on:click={handleDeleteClick}> DELETE </button>
			{/if}
			{#if component === 0 && title !== 'image'}
				<div>
					<p>{title}</p>
				</div>
			{/if}
			{#if title === 'image'}
				<p>This will delete the image number {component}! Are you sure?</p>
				<button class="genbutton red" on:click={deleteImage}> DELETE </button>
			{/if}
			{#if title === 'snip'}
				<p>Delete this chat?</p>
				<button class="genbutton red" on:click={deleteLocalChat}>Delete</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
	}

	.modal {
		background-color: white;
		padding: 1em;
		border-radius: 4px;
		width: 80%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}
</style>
