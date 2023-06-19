<script lang="ts">
	import { spring } from 'svelte/motion';
	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 1,
			damping: 1
		}
	);
	let size = spring(10);
</script>

<div class="screener">
	<svg
		on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
		on:mousedown={() => size.set(30)}
		on:mouseup={() => size.set(10)}
	>
		<circle cx={$coords.x} cy={$coords.y} r={$size} />
	</svg>
</div>

<style>
	.screener {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
	}
	svg {
		width: 100%;
		height: 100%;
		margin: -8px;
	}
	circle {
		stroke: #10d56c;
		fill: transparent;
	}
</style>
