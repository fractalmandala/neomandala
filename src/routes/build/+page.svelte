<script lang="ts">

	import { showModal, showToast } from '$lib/stores/modalstores';
    import ModalSub from '$lib/components/ModalSub.svelte'
    import { readingMode } from '$lib/stores/globalstores'
	import { SpeechSettings, SpeechStore } from 'talk2svelte';
	import { audioStore } from '$lib/stores/modalstores';
	import { filter } from 'rxjs';
	import { onMount } from 'svelte';
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

	let inputValue = '';
	let recording = false;

	onMount(() => {
		SpeechSettings.declareCommand('record');
		SpeechSettings.declareCommand('stop');
		const subscriptions = [
			SpeechStore.currentCommand.pipe(filter((command) => command === 'record')).subscribe(() => {
				inputValue = '';
				recording = true;
			}),
			SpeechStore.currentCommand.pipe(filter((command) => command === 'stop')).subscribe(() => {
				recording = false;
			}),
			SpeechStore.message
				.pipe(filter(() => recording === true))
				.subscribe((message) => (inputValue = message))
		];
		return () => {
			SpeechSettings.removeCommand('record');
			SpeechSettings.removeCommand('stop');
			subscriptions.map((sub) => sub.unsubscribe());
		};
	});

</script>

<div class="rta-grid grid2 right00 screen minH cushion">
	<div class="rta-column rowgap200 postgrid">
        <div class="rta-image height-60">
		    <img src="/images/psychedelic.webp" alt="psychedelic" />
        </div>
		<button on:click={() => showModal('Password Check', 'Please enter password.', ModalSub, {content: 'Try'})}>Show modal</button>
        <button on:click={() => showToast('Hello!')}>Show Toast</button>
	</div>
	<div class="rta-column titlebox null" class:invisible={$readingMode}>
		<img
			class="jello-vertical"
			src="/images/k-build.png"
			alt="writing"
			on:mouseover={() => audio.play()}
			on:focus={fauxfake}
		/>
		<h3 class="tt-u">build</h3>
		<p class="grey">felt cute, might build something.</p>
	</div>
</div>
