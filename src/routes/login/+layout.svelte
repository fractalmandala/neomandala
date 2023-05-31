<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	let loading = false;

	const handleLogout: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Login at Fractala da Maṇḍala</title>
</svelte:head>

<div
	class="rta-column rowgap600 minH back"
	style="background-image: url('/images/guardmonke.webp')"
>
	<slot />
	<div class="rta-column rowgap200 null bord-top p-top-32 thisguy">
		{#if $page.data.session}
			<h6 class="tt-u grot">you wan go?</h6>
			<form action="/logout" method="post" use:enhance={handleLogout}>
				<button class="genbutton" disabled={loading} type="submit">Sign out</button>
			</form>
		{/if}
	</div>
</div>

<style lang="sass">


.back
	padding: 128px 32px
	background-position: 200px center
	@media screen and (max-width: 786px)
		background-position: center center
		justify-content: flex-end


.thisguy
	max-width: 320px
	padding-left: 32px

</style>
