<script lang="ts">
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import { formatTimeAgo } from '$lib/agent/generalutils';
	import FinalTip from '$lib/components/FinalTip.svelte';
	import Draft from '$lib/icons/Draft.svelte';
	import Time from '$lib/icons/Time.svelte';
	export let data;
</script>

<div
	class="minH p-top-64 rta-column rowgap300 boundary"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="titler null rowgap100 m-top-16">
		<h4 class="tt-c bord-bot p-bot-16">{data.title}</h4>
		<div class="rta-row colgap300">
			<div class="rta-column xcenter rowgap50 p-top-8">
				<svg
					width="20"
					height="20"
					viewBox="0 0 27 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.5 1.125L23.9344 7.36875C24.2531 7.5375 24.4687 7.76719 24.5812 8.05781C24.6937 8.34844 24.75 8.63437 24.75 8.91562V21.9375C24.75 22.3875 24.5812 22.7812 24.2437 23.1187C23.9062 23.4562 23.5125 23.625 23.0625 23.625H3.9375C3.4875 23.625 3.09375 23.4562 2.75625 23.1187C2.41875 22.7812 2.25 22.3875 2.25 21.9375V8.91562C2.25 8.63437 2.31094 8.34844 2.43281 8.05781C2.55469 7.76719 2.76562 7.5375 3.06562 7.36875L13.5 1.125ZM13.5 14.2312L22.95 8.69062L13.5 3.00937L4.05 8.69062L13.5 14.2312Z"
						fill="#b7b7b7"
					/>
				</svg>
				<cite class="grey">draft</cite>
			</div>
			<div class="rta-column xcenter rowgap50 p-top-8">
				<Time dimension={20} color="#b7b7b7" />
				<cite class="grey">{formatTimeAgo(data.created_at)}</cite>
			</div>
		</div>
	</div>
	<FinalTip bodyText={data.content} />
</div>

<style lang="sass">

.light.boundary
	background: #e1e1e1
	.titler
		background: white

.dark.boundary
	background: #171717
	.titler
		background: #121212
		box-shadow: 4px 3px 7px #080707

.boundary
	.titler
		width: 772px
		margin-left: 112px
		border-radius: 6px
		padding: 32px


</style>
