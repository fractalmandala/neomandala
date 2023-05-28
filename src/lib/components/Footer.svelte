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

{#if isShown}
	<footer class="footermain">
		<div class="rta-row colgap100 ycenter null">
			<small>
				I'm Amrit, a writer and creator based in Gurgaon, India. I work as Director of Strategy at <a
					href="https://www.brhat.in"
					target="_blank"
					rel="noreferrer">Bṛhat</a
				>, a cultural content, research and learning organization. Apart from this site, I also
				develop and maintain Bṛhat's website and the sister portal
				<a href="https://www.brhateducation.in" target="_blank" rel="noreferrer">Bṛhat Education.</a
				>
			</small>
		</div>
		<div class="rta-row grey">
			<Github />
			<Twitter />
		</div>
	</footer>
{/if}

<style lang="sass">

.footermain
	display: flex
	flex-direction: column
	row-gap: 12px
	align-items: center
	justify-content: center
	.rta-row small
		margin: 0

</style>
