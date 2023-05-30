<script lang="ts">
	import Loader from '$lib/assets/Loader.svelte';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { slide } from 'svelte/transition';

	let show = false;
	function toggleShow() {
		show = !show;
	}
</script>

<div class="menudropper">
	<div class="menulogo" on:mouseenter={toggleShow}>
		<Loader />
	</div>
	{#if show}
		<div
			class="rest rta-column ta-r"
			transition:slide
			on:mouseleave={toggleShow}
			use:clickOutsideAction
			on:clickoutside={toggleShow}
		>
			<a class="menulinks" href="/web">Web</a>
			<a class="menulinks" href="/word">Word</a>
			<a class="menulinks" href="/sound">Sound</a>
			<a class="menulinks" href="/image">Image</a>
			<a class="menulinks" href="/video">Video</a>
			<a class="menulinks" href="/note">Note</a>
			<a class="menulinks" href="/pad">Pad</a>
			<a class="menulinks" href="/admin">Admin</a>
			<slot name="link1" />
		</div>
	{/if}
</div>

<style lang="sass">


.menudropper
	position: relative
	.rest
		position: absolute
		top: 48px
		right: 0


</style>
