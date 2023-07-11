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
	<div class="rta-column rowgap600 posts bord-top grot p-top-64">
		{#if posts && posts.length > 0}
			<h4 class="p-bot-32 ta-c-d">More</h4>
			{#each posts as item}
				<a class="rta-column xleft grot ticket" href={item.linkpath}>
					<h4 class="tt-c hover p-bot-8">{item.meta.title}</h4>
					<p>{item.meta.description}</p>
					<small class="tt-u">{item.meta.type} | {item.meta.tags}</small>
				</a>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.top
	align-items: center

.leveltwo
	.posts
		padding-left: 32px
		padding-right: 32px

.posts
	@media screen and (min-width: 1024px)
		.ticket
			width: 720px
			padding-left: 40px
			padding-right: 40px
	@media screen and (max-width: 1023px)
		padding: 16px
		.ticket
			width: 80%

.leveltwo
	.ticket
		width: 100%

.ticket
	transition: all .3s 
	p
		color: var(--onlyblack)
		padding-top: 4px
	small
		color: #10D56C
		letter-spacing: 2px	
		font-size: 10px
	h4
		color: var(--texttwo)
		position: relative
		margin: 0
		line-height: 1
		&::after
			position: absolute
			bottom: 0
			left: 50%
			height: 1px
			background: #10D56C
			width: 0
			content: ''
			transition: 0.1s
		&:hover
			color: var(--background)
			&::after
				left: 0
				width: 100%


</style>
