<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { deleteStore, hideDelete, deleteChatSession, deleteBool } from '$lib/gpt/chatstore';
	import Alert from '$lib/icons/Alert.svelte';
	import Close from '$lib/icons/Close.svelte';
	import { onMount } from 'svelte';

	let isShown: any, title: string, message: string;
	export let deleteID: string;

	let color = '#fe4a49';

	function handleConfirm() {
		deleteBool.set(true);
		hideDelete();
	}

	const unsubscribe = deleteStore.subscribe((value) => {
		({ isShown, title, message } = value);
	});

	onMount(() => {
		return unsubscribe;
	});

	function handleCloseClick() {
		hideDelete();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hideDelete();
		}
	}

	afterUpdate(() => {
		return unsubscribe;
	});
</script>

{#if isShown}
	<div class="modal-overlay" on:click={handleOverlayClick} on:keydown={handleOverlayClick}>
		<div class="modal null rowgap100 rta-column">
			<div class="rta-row between ycenter null">
				<div class="rta-row colgap100 ycenter null">
					<Alert />
					<h6 class="noh" style="color: #474747; margin: 0; padding: 2px 0 0 0; line-height: 0.5">
						{title}
					</h6>
				</div>
				<button class="blank-button" on:click={handleCloseClick}>
					<Close {color} />
				</button>
			</div>
			<p>{message} | {deleteID}</p>
			<button class="glowred" on:click={() => handleConfirm}> Delete </button>
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
		z-index: 1000;
	}

	.modal {
		background-color: white;
		padding: 1em;
		border-radius: 4px;
		width: 80%;
		max-width: 500px;
	}
</style>
