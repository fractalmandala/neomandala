<script lang="ts">
	import { noteStore, hideNote } from '$lib/stores/modalstores';
	import { slide } from 'svelte/transition';
	import Note from '$lib/icons/Note.svelte';
	import Close from '$lib/icons/Close.svelte';
	import CodeBlock from '$lib/icons/Code.svelte';
	import { onMount } from 'svelte';
    import '$lib/styles/design.sass'

	let isShown: boolean, title: string;

	let color = '#474747';

	let noteTitle = '';
	let content = '';
	let language = '';
	let tags = '';
	let isSnip = false;
	let isTag = false;
	let isFeat = false;
	let fake = false;
	let featured: boolean = false;

	function toggleSnip() {
		isSnip = !isSnip;
	}

	function toggleTag() {
		isTag = !isTag;
	}

	function toggleFeat() {
		isFeat = !isFeat;
		if (isFeat === true) {
			featured = true;
		}
	}

	const unsubscribe = noteStore.subscribe((value) => {
		({ isShown, title } = value);
	});

	onMount(() => {
		return unsubscribe;
	});

	function handleCloseClick() {
		hideNote();
	}

	function handleOverlayClick(e: any) {
		if (e.target === e.currentTarget) {
			hideNote();
		}
	}
</script>

{#if isShown}
	<div
		class="modal-overlay"
		on:click={handleOverlayClick}
		on:keydown={handleOverlayClick}
		transition:slide
	>
		<div class="modal null">
			<div class="rta-row between ycenter null">
				<div class="rta-row colgap100 ycenter null">
					<Note />
					<p><strong>{title}</strong></p>
				</div>
				<button class="blank-button" on:click={handleCloseClick}>
					<Close {color} />
				</button>
			</div>
			<form class="formA rta-grid grid2 colgap200">
				<div class="rta-column ybetween rowgap200">
                    <div class="rta-column rowgap100">
					<input type="text" placeholder="title" bind:value={noteTitle} />
					<div class="rta-row colgap100 ycenter">
						<div class="rta-row input-label ycenter">
							<input type="checkbox" id="tag" on:click={toggleTag} />
							<label for="tag">Tag</label>
						</div>
						<div class="rta-row input-label ycenter">
							<input type="checkbox" id="snip" on:click={toggleSnip} />
							<label for="snip">Snip</label>
						</div>
						<div class="rta-row input-label ycenter">
							<input type="checkbox" id="bool" on:click={toggleFeat} />
							<label for="bool">
								{#if isFeat}
									TRUE
								{:else}
									Feat
								{/if}
							</label>
						</div>
					</div>
					{#if isTag}
						<input type="text" placeholder="tags" bind:value={tags} />
					{/if}
					{#if isSnip}
						<select bind:value={language}>
							<option value="html">html</option>
							<option value="typescript">typescript</option>
							<option value="sass">sass</option>
							<option value="sql">sql</option>
							<option value="shell">shell</option>
						</select>
					{/if}
                    </div>
                <button class="mainbutton">
                    submit
                </button>
				</div>
				<div class="rta-column">
					<textarea bind:value={content} />
				</div>
			</form>
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
		z-index: 500;
	}

	.modal {
		background-color: #f6edd9;
		padding: 24px;
		border-radius: 4px;
		width: 80%;
		max-width: 560px;
        display: flex;
        flex-direction: column;
        row-gap: 24px;
	}
</style>
