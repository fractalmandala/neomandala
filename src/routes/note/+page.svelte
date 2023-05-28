<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import Prism from 'prismjs';
	import '$lib/styles/prism.css';
	import { slide } from 'svelte/transition';
	import { showCode } from '$lib/dash/db';
	import { PlusCircle } from 'lucide-svelte';
	import { snippets } from '$lib/dash/db';
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores';
	import { showChip } from '$lib/stores/modalstores';
	import CodeInput from '$lib/dash/CodeInput.svelte';
	import { clickToCopyAction } from '$lib/utils/clicktocopy';

	export let data: PageData;

	let snips: any;
	let noteIn = Array(40).fill(false);
	noteIn[0] = true;
	let expandCodes = false;
	let fake = false;
	let code: any;
	let showID: number;

	function fauxfake() {
		fake = !fake;
	}

	export async function setCode(newID: number) {
		showID = newID;
	}

	$: if (showID) {
		Prism.highlightAll();
		(async () => {
			code = await showCode(showID);
		})();
	}

	async function refreshCode() {
		code = await showCode(showID);
	}

	function toggleCodes() {
		expandCodes = !expandCodes;
	}

	function toggleNote(index: number) {
		noteIn[index] = !noteIn[index];
		for (let i = 0; i < noteIn.length; i++) {
			if (i !== index && noteIn[i] === true) {
				noteIn[i] = false;
			}
		}
	}

	$: anyNote = noteIn.some((item) => item);

	$: ({ testTable, user } = data);

	onMount(() => {
		Prism.highlightAll();
		(async () => {
			snips = await snippets();
			code = await showCode(showID);
		})();
	});

	afterUpdate(() => {
		Prism.highlightAll();
	});
</script>

<div
	class="mynotepad"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:light={$themeMode}
	class:dark={!$themeMode}
>
	<div class="rta-column null noteleft" data-lenis-prevent>
		{#if data.in === true}
			<div class="rta-column rowgap100 p-bot-16 null">
				<div class="rta-row null ycenter colgap100">
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 12C9.31368 12 12 9.31368 12 6C12 2.68629 9.31368 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31368 2.68629 12 6 12Z"
							fill="url(#paint0_linear_15_346)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_15_346"
								x1="6"
								y1="0"
								x2="6"
								y2="12"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#98DA1F" />
								<stop offset="1" stop-color="#2B9348" />
							</linearGradient>
						</defs>
					</svg>
					<cite class="tt-u">Logged In</cite>
				</div>
				<!--<small class="grey">{user.session_id}</small>-->
			</div>
			<div class="rta-column rowgap100 bord-top p-top-16 p-bot-16">
				<div class="biggie rta-row colgap100 null ycenter point">
					<PlusCircle size={16} color="#0ca64c" />
					<small>Add New Code</small>
				</div>
				<div class="biggie rta-row colgap100 null ycenter point">
					<PlusCircle size={16} color="#0ca64c" />
					<small>New Chat</small>
				</div>
			</div>
			<div class="rta-column snips bord-top p-top-16">
				<button class="blank-button rta-row ycenter null colgap100" on:click={toggleCodes}>
					<div class="rta-column">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 16L22 12L18 8"
								stroke="url(#paint0_linear_15_220)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6 8L2 12L6 16"
								stroke="url(#paint1_linear_15_220)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M14.5 4L9.5 20"
								stroke="url(#paint2_linear_15_220)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_15_220"
									x1="20"
									y1="8"
									x2="20"
									y2="16"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#20E27B" />
									<stop offset="1" stop-color="#04A932" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_15_220"
									x1="4"
									y1="8"
									x2="4"
									y2="16"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#20E27B" />
									<stop offset="1" stop-color="#04A932" />
								</linearGradient>
								<linearGradient
									id="paint2_linear_15_220"
									x1="12"
									y1="4"
									x2="12"
									y2="20"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#20E27B" />
									<stop offset="1" stop-color="#04A932" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<small>All Codesnips:</small>
				</button>
				{#if $breakZero || $breakOne || expandCodes}
					{#if snips && snips.length > 0}
						<div class="rta-column rowgap50 p-top-8" transition:slide>
							{#each snips as item, i}
								<button class="blank-button ta-l" on:click={() => setCode(item.id)}>
									<small class="hover grey">{item.title}</small>
								</button>
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		{/if}
	</div>
	<div class="rta-column notemid null ytop">
		<div class="rta-column code">
			{#if noteIn[0]}
				<CodeInput />
			{/if}
		</div>
	</div>
	<div class="rta-column rowgap200 noteright" data-lenis-prevent>
		{#if code && code.length > 0}
			{#each code as item}
				<div class="disp-title">{item.title}</div>
				<div class="rta-row colgap100">
					<div class="disp-meta">{item.uuidtext}</div>
					<div class="disp-sub">{item.tags}</div>
				</div>
				<div class="disp-code">
					<button
						class="blank-button grad-green rta-row ycenter xend ta-r"
						use:clickToCopyAction={item.content}
						on:copy-done={() => showChip('Copied!', '#10D56C')}
						on:copy-error={() => showChip('Failed!', '#10D56C')}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z"
								stroke="url(#paint0_linear_16_22)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4"
								stroke="url(#paint1_linear_16_22)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_16_22"
									x1="15"
									y1="8"
									x2="15"
									y2="22"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#20E27B" />
									<stop offset="1" stop-color="#04A932" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_16_22"
									x1="9"
									y1="2"
									x2="9"
									y2="16"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#20E27B" />
									<stop offset="1" stop-color="#04A932" />
								</linearGradient>
							</defs>
						</svg>
					</button>
					<pre class="bord-top language-{item.uuidtext}"><code class="language-{item.uuidtext}"
							>{@html item.content}</code
						></pre>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.disp-code
	background: #171717
	padding-top: 8px
	padding-bottom: 8px
	height: 88%
	overflow-y: scroll
	border: 1px solid rgba(255, 255, 255, 0.04)
	pre
		white-space: pre-line
		padding: 16px
		font-family: 'Space Mono', monospace
		code
				font-family: 'Space Mono', monospace
				font-size: 14px
				white-space: pre-line
	.grad-green
		padding-right: 16px
		text-align: right
		display: flex
		flex-direction: row
		justify-content: flex-end
		width: 100%
	&::-webkit-scrollbar
		width: 1px
	&::-webkit-scrollbar-thumb
		background: #10D56C
		border-bottom: 450px solid #171717

.mynotepad
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	position: sticky
	top: 0
	width: 100vw
	overflow-x: hidden

.levelzero
	grid-template-columns: 296px 1fr 1fr
	grid-template-areas: "noteleft notemid noteright"
	position: sticky
	top: 0
	height: 100vh
	column-gap: 36px
	padding-right: 2vw
	.noteleft
		width: 280px
		height: 100vh
		overflow-y: scroll
		grid-area: noteleft
		padding-left: 2vw
		padding-top: 96px
		padding-bottom: 32px
	.noteleft::-webkit-scrollbar
		width: 1px
	.noteleft::-webkit-scrollbar-thumb
		background: #10D56C
		border-top: 50px solid #171717
		border-bottom: 400px solid #171717
	.notemid
		grid-area: notemid
		height: 100vh
		padding-top: 88px
		display: grid
		grid-auto-flow: row
		grid-template-rows: auto
		grid-template-columns: 1fr 46%
		grid-template-areas: "code block"
		padding-bottom: 32px
		.code
			grid-area: code
			background: rgba(255,255,255,0.03)
			border-radius: 4px
			backdrop-filter: blur(10px)
			padding: 16px
			border: 1px solid rgba(255,255,255,0.07)
	.noteright
		grid-area: noteright
		height: calc(100vh - 120px)
		margin-top: 88px
		background: rgba(255, 255, 255, 0.001)
		overflow-y: scroll
		border: 1px solid rgba(255,255,255,0.07)
		padding: 16px
		border-radius: 6px


.leveltwo
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	grid-template-columns: 1fr
	grid-template-areas: "noteleft" "notemid" "noteright"
	min-height: 100vh
	column-gap: 0
	row-gap: 32px
	padding-top: 80px
	padding-left: 5vw
	padding-right: 5vw
	.noteleft
		grid-area: noteleft
		width: 100%
		padding-top: 0
		padding-left: 0
	.notemid
		grid-area: notemid
		padding-top: 0
		padding-left: 0
		padding-right: 0
		display: grid
		grid-auto-flow: row
		grid-template-areas: "code" "block"
		grid-template-rows: auto
		grid-template-columns: 1fr
		.code
			grid-area: code
			background: rgba(255, 255, 255, 0.03)
			border-radius: 4px
			backdrop-filter: blur(10px)
			padding: 16px
			border: 1px solid rgba(255, 255, 255, 0.07)
	.noteright
		grid-area: noteright
		width: 100%
		padding-top: 0
		padding-right: 0

</style>
