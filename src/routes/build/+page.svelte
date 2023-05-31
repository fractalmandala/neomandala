<script lang="ts">
	import { onMount } from 'svelte';
	import { audioStore } from '$lib/stores/modalstores';
	import supabase from '$lib/utils/supabase';
	import { marked } from 'marked';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		windowWidth,
		scrollY
	} from '$lib/stores/globalstores';
	let audio: any;

	let posts: any;

	async function singlePost() {
		const { data, error } = await supabase.from('amrit-notes').select().eq('id', 116);
		if (error) throw new Error(error.message);
		return data;
	}

	audioStore.subscribe((value) => (audio = value));
	let fake = false;

	onMount(async () => {
		posts = await singlePost();
	});
</script>

<div class="rta-column actualcontainer">
	<div class="inctualcontainer">
		{#if posts && posts.length > 0}
			{#each posts as item}
				<pre>{marked.parse(item.content)}</pre>
			{/each}
		{/if}
	</div>
</div>
