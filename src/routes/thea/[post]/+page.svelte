<script lang="ts">

	import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'

	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	export let data
	import { allThea } from '$lib/utils/localpulls'
	let pens: any;
  let element:any
  let editor:any

	$: (async() => {
		pens = await allThea();
	})();

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
      ],
      content: data.content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })

</script>

<div
	class="appshell"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="shellmain thisispost">
		<div bind:this={element} />
		<svelte:component this={data.content}/>
	</div>
	<div class="shellside rta-column null">
		<h4>{data.title}</h4>
			{#if pens && pens.length > 0}
				{#each pens as item}
					<h6>
						<a href={item.linkpath}>
							{item.meta.id}-{item.meta.title}
						</a>
					</h6>
				{/each}
			{/if}
	</div>
</div>
