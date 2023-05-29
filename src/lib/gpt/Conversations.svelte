<script lang="ts">
	import { chatSessions, deleteChatSession, showDelete } from '$lib/gpt/chatstore';
	import ModalDelete from '$lib/gpt/ModalDelete.svelte';
	import * as timeago from 'timeago.js';

	let detArr = Array(50).fill(false);

	function toggleDetailsConfirmation(index: number) {
		detArr[index] = !detArr[index];
		for (let i = 0; i < detArr.length; i++) {
			if (i !== index && detArr[i] === true) {
				detArr[i] = false;
			}
		}
	}

	$: anyDetOpen = detArr.some((item) => item);

	function formatTimeAgo(date: timeago.TDate) {
		const timeAgoString = timeago.format(date);
		if (timeAgoString.includes('seconds')) return 'just now';
		if (timeAgoString.includes('minute')) return timeAgoString.replace(' minutes ago', 'm');
		if (timeAgoString.includes('hour')) return timeAgoString.replace(' hours ago', 'h');
		if (timeAgoString.includes('day')) return timeAgoString.replace(' days ago', 'd');
		if (timeAgoString.includes('week')) return timeAgoString.replace(' weeks ago', 'w');
		if (timeAgoString.includes('month')) return timeAgoString.replace(' months ago', 'mo');
		if (timeAgoString.includes('year')) return timeAgoString.replace(' years ago', 'y');
		// Return the original string if it doesn't match any of the above conditions
		return timeAgoString;
	}
</script>

<div class="rta-column rowgap300 convos">
	{#each $chatSessions.sort((a, b) => {
		if (!b.createdAt) return -1; // b is undefined, a comes first
		if (!a.createdAt) return 1; // a is undefined, b comes first
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // normal comparison
	}) as session, i}
		<div class="rta-column rowgap100">
			<button class="blank-button rta-row xleft" on:click={() => toggleDetailsConfirmation(i)}>
				<small style="color: var(--onlyblack)">{session.id}</small>
			</button>
			<!--
			<div class="rta-column messages">
			{#each session.messages as message}
				<small>{message.query}</small>
			{/each}
			</div>
			-->
			<div class="rta-row ycenter colgap200">
				<div class="rta-row ycenter null colgap50">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
							stroke="#474747"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
							stroke="#474747"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<small class="grey">{session.messages.length}</small>
				</div>
				<div class="rta-row ycenter null colgap50">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
							stroke="#474747"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 6V12H7.5"
							stroke="#474747"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					{#if session.createdAt && session.createdAt.length > 0}
						<small class="grey">{formatTimeAgo(session.createdAt)}</small>
					{:else}
						<small class="grey">{timeago.format('2021-05-29T06:03:01.979Z')}</small>
					{/if}
				</div>
				<cite>{session.sessionbot}</cite>
			</div>
		</div>
	{/each}
</div>

<style lang="sass">

.convos
	overflow-y: scroll

</style>
