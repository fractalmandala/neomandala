<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { fly } from 'svelte/transition'
	import { quadOut, quadIn } from 'svelte/easing'

</script>

<div class="transistor" in:fly={{ delay: 500, duration: 400, x: -700, easing: quadOut}} out:fly={{ delay: 0, duration: 350, opacity: 0, x: 700, easing: quadIn}} class:dark={$themeMode} class:light={!$themeMode}>
	<slot></slot>
</div>

<style lang="sass">

.transistor
    height: 100%
    width: 100%


</style>