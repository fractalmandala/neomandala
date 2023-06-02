import { defaultWindow } from '$lib/utils/shared'
import type { ConfigurableWindow, Position } from '$lib/types/WindowScreens'
import { readable, type Readable } from "svelte/store";
import { listen } from "svelte/internal";
import { spring } from 'svelte/motion'

export interface UseMouseOptions extends ConfigurableWindow {
	/**
	 * Initial values
	 */
	initialValue?: Position;
}

const coords= spring({x: 50, y: 50}, {
		stiffness: 0.1,
		damping: 1
	})

const initialValue = {
	x: 0,
	y: 0,
};

function getCurrentMousePosition(e?: MouseEvent): Position {
	if (!e) return initialValue;

	coords.set({ x: e.pageX, y: e.pageY })

	return {
		x: e.pageX,
		y: e.pageY,
	};
}

export function mouseStore(options: UseMouseOptions = {}): Readable<Position> {
	const { window = defaultWindow } = options;

	const position = readable(getCurrentMousePosition(), (set) => {
		function handler(e: MouseEvent) {
			set(getCurrentMousePosition(e));
		}

		if (window) {
			const stop = listen(window, "mousemove", handler as () => void);

			return () => {
				stop();
			};
		}
	});

	return position;
}

// in usage:
// import { mouseStore } from 'svelte-legos';
// const position = mouseStore();
// $position gives the
// Position { x: number, y: number } of the mouse