<script lang="ts">
	import cn from 'clsx';

	import { introOutStore } from '$lib/lenis/lenisstores'

	import Lns from '$lib/lenis/LNS.svelte'
	import Ei from '$lib/lenis/EI.svelte';

	let className = '';

	export { className as class };
</script>

<div class={className}>
	<Lns fill="var(--pink)" />
	<Ei fill="var(--pink)" class={cn($introOutStore && 'translate', 'mobile')} />
</div>
 