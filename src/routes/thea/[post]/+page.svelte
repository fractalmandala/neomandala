<script lang="ts">

	import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores';
	export let data

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
		<svelte:component this={data.content}/>
	</div>
	<div class="shellside">
		<h4>{data.title}</h4>
	</div>
</div>
