<script lang="ts">
	import { pinnedNotesStore, hidePinned } from '$lib/dash/modalstores';
	import Close from '$lib/icons/Close.svelte';
	import { onMount } from 'svelte';

	let isShown: any;
	let color = '#474747';

	function handleDeleteClick() {
		hidePinned();
	}

	const unsubscribe = pinnedNotesStore.subscribe((value) => {
		({ isShown } = value);
	});

	onMount(() => {
		return unsubscribe;
	});

	function handleCloseClick() {
		hidePinned();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hidePinned();
		}
	}
</script>

{#if isShown}
	<div class="pinned-notes" on:click={handleOverlayClick} on:keydown={handleOverlayClick}>
		<div class="null grot">
			<div class="rta-row between ycenter null">
				<button class="blank-button" on:click={handleCloseClick}>
					<Close {color} />
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="sass">

.pinned-notes
	display: flex
	flex-direction: column
	right: 0
	top: 80px
	position: fixed
	width: 280px
	margin-right: 3.2vw
	height: calc(100vh - 112px)
	z-index: 2000
	background: #f1f1f1
	padding: 16px

</style>
