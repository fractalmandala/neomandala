<script lang="ts">
	import { marked } from 'marked';
	import Notes from '$lib/dash/NotesForm.svelte';
	export let data;
</script>

<div class="rta-column">
	<div class="grot bord-bot null p-bot-32">
		<cite><a href="/janapada/editing/{data.id}">Edit</a></cite>
		<h3 style="margin: 0">{data.title}</h3>
	</div>
	<pre class="rta-column textarea p-top-32">
		{@html marked(data.content)}
	</pre>
</div>

<style lang="sass">

.textarea
	row-gap: 24px
	font-family: 'Space Grotesk', sans-serif
	font-size: 18px
	line-height: 1.5

</style>
