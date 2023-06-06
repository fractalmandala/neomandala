<script lang="ts">
	import type { NoteItem } from '$lib/dash/notesutil';
	import { marked } from 'marked';
	export let data: NoteItem = {
		title: '',
		content: '',
		timestamp: '',
		id: ''
	};
</script>

<div class="grot null rta-column rowgap500">
	<div class="rta-column rowgap100">
		<small>{data.id}</small>
		<h3 style="margin: 0">{data.title}</h3>
	</div>
	<pre class="content rta-column rowgap300">
		{@html marked(data.content)}
	</pre>
</div>
