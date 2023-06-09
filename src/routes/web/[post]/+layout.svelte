<script lang="ts">
	import { onMount } from 'svelte';
	import { breakTwo } from '$lib/stores/globalstores';
	import { allWebdev } from '$lib/utils/localpulls';
	let posts: any;

	onMount(async () => {
		posts = await allWebdev();
	});
</script>

<div class="rta-column top rowgap600 p-bot-64" class:leveltwo={$breakTwo}>
	<slot />
	<div class="rta-column posts bord-top grot p-top-64">
		{#if posts && posts.length > 0}
			<h4 class="p-bot-32">More</h4>
			{#each posts as item}
				<div class="rta-column grot null p-bot-32">
					<h5>
						<a href={item.linkpath}>
							{item.meta.title}
						</a>
					</h5>
					<small><span style="color: #10D56C">{item.meta.type}</span> | {item.meta.tags}</small>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.posts
	h5
		color: var(--texttwo)
		&:hover
			color: var(--default)

.top
	align-items: center

.leveltwo
	.posts
		padding-left: 32px
		padding-right: 32px

.posts
	@media screen and (min-width: 769px)
		width: 720px
		padding-left: 40px
		padding-right: 40px

</style>
