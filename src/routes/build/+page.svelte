<script lang="ts">

	import { showModal } from '$lib/stores/modalstores';
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

<div class="rta-grid grid2 right00 screen fullH cushion">
	<div class="rta-image height-80 postgrid">
		<img src="/images/psychedelic.webp" alt="psychedelic" />
		<button on:click={() => showModal('Page 1 Modal', 'Hello from Page 1')}>Show modal</button>
	</div>
	<div class="rta-column titlebox null">
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
