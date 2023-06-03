<script lang="ts">
	import { footerStore, hideFooter } from '$lib/stores/modalstores';
	import Alert from '$lib/icons/Alert.svelte';
	import Close from '$lib/icons/Close.svelte';
	import Github from '$lib/icons/Github.svelte';
	import Twitter from '$lib/icons/Twitter.svelte';
	import { onMount } from 'svelte';

	let isShown: any, lineone: string, linetwo: string;

	const unsubscribe = footerStore.subscribe((value) => {
		({ isShown } = value);
	});
</script>

<footer class="footermain">
	<div class="rta-row grot colgap100 ycenter null">
		<small> 2023 | Amritanshu Pandey </small>
		<div class="rta-row grey">
			<Github />
			<Twitter />
		</div>
	</div>
</footer>

<style lang="sass">

.footermain
	display: flex
	flex-direction: column
	row-gap: 12px
	align-items: center
	justify-content: center
	height: 56px
	background-color: hsla(0,0%,0%,1)
	background-image: radial-gradient(at 0% 100%, hsla(116,85%,11%,1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(74,56%,9%,0.82) 0px, transparent 50%), radial-gradient(at 91% 14%, hsla(147,67%,5%,0.74) 0px, transparent 50%)
	.rta-row small
		color: #676767
		margin: 0
	@media screen and (min-width: 769px)
		padding: 0 3.2vw
	@media screen and (max-width: 768px)
		padding: 0 16px

</style>
