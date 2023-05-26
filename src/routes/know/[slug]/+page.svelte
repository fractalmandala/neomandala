<script lang="ts">

	export let data

</script>

<small>{data.tags}</small>
<h4>{data.title}</h4>
<div class="knowcontainer">
	<svelte:component this={data.content}/>
</div>