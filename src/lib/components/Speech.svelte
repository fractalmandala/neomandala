<script>
	import { SpeechSettings, SpeechStore } from 'talk2svelte';
	import { filter } from 'rxjs';
	import { onMount } from 'svelte';

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
<textarea>{inputValue}</textarea>