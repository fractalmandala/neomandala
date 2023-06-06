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

<div class="grot null">
	<small>{data.id}</small>
	<h4>{data.title}</h4>
	<div class="content">
		{@html marked(data.content)}
	</div>
</div>
