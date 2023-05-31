---
title: testbuild
---

<script lang="ts">
	import { onMount } from 'svelte';
	import supabase from '$lib/utils/supabase';
	import { marked } from 'marked';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';

	let posts: any;

	async function singlePost() {
		const { data, error } = await supabase.from('amrit-notes').select().eq('id', 116);
		if (error) throw new Error(error.message);
		return data;
	}

	onMount(() => {
		Prism.highlightAll();

		(async() => {
			posts = await singlePost();
		})();
	});


</script>

{#if posts && posts.length > 0}

{#each posts as item}

<pre class="language-markdown">

	{marked.parse(item.content)}
	
</pre>

{/each}

{/if}
