<script lang="ts">
	import { onMount } from 'svelte';
	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	import CodeText from '$lib/dash/CodeTextArea.svelte';
</script>

<div class="rta-column actualsection" class:light={$themeMode} class:dark={!$themeMode}>
	<div class="inctualsection">
		<div data-lenis-prevent>
			<CodeText />
		</div>
	</div>
</div>
