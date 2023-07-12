<script lang="ts">
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import Editor from '$lib/notepad/Notes.svelte';
</script>

<div
	class="thispage"
	class:levelzeroth={$breakZero}
	class:levelonus={$breakOne}
	class:levelduos={$breakTwo}
>
	<Editor />
</div>

<style lang="sass">
	
.thispage.levelzeroth
	padding-left: 360px
	padding-right: 360px
	padding-top: 64px
	padding-bottom: 64px

</style>
