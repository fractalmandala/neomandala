<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let form: ActionData;
	let loading = false;
	let signupForm = false;

	function toggleForm() {
		signupForm = !signupForm;
	}

	function handleSignup() {
		loading = true;
	}

	const handleSubmit: SubmitFunction = () => {
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

<section class="columnsmt-6pt-6">
	<div class="rta-column null rowgap200 thisgal">
		<h5 class="tt-u grot">you wan come?</h5>
		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		<form class="thisform" method="post" action="?/login">
			<div class="rta-column rowgap100 null">
				<input
					id="email"
					name="email"
					value={form?.values?.email ?? ''}
					class="input"
					type="email"
					placeholder="Email"
					required
				/>

				<input
					id="password"
					name="password"
					class="input"
					type="password"
					placeholder="Password"
					required
				/>

				<button disabled={loading} class="genbutton">Sign in</button>
			</div>
		</form>
	</div>
</section>

<style lang="sass">

.columnsmt-6pt-6
	padding-left:  32px

.thisform
	width: 240px
	input[type=email], input[type=password]
		border: 1px solid var(--contraster)
		padding: 4px 8px
		font-size: 12px
		border-radius: 4px

h5.grot
	@media screen and (max-width: 786px)
		color: white
	
.thisgal
	@media screen and (max-width: 786px)
		padding: 16px
		background: rgba(0,0,0,0.7)
	

</style>
