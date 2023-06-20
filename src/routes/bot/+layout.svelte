<script lang="ts">
	import Shell from '$lib/design/ShellTwo.svelte';
	import { chatSessions } from '$lib/gpt/chatstore';
</script>

<Shell>
	<div slot="side" class="rta-column rowgap50 sid">
		<p><a href="/bot">Bot</a></p>
		{#if $chatSessions && $chatSessions.length > 0}
			{#each $chatSessions as chat}
				<p>
					<a href="/bot/{chat.id}">
						{chat.id.slice(0, 23)}
					</a>
				</p>
			{/each}
		{/if}
	</div>
	<div slot="main" class="rta-column">
		<slot />
	</div>
</Shell>

<style lang="sass">

.sid
	height: calc(100vh - 160px)
	overflow-y: scroll
	top: 112px
	position: sticky

p a
	color: var(--default)
	&:hover
		color: #10D56C

</style>
