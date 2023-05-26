import { onMount } from 'svelte';
import { browser } from '$app/environment'
import { writable, get } from 'svelte/store';
import type Lenis from '@studio-freight/lenis';

export const lenisStore = writable<Lenis | null>(null);

export function setLenisStore(lenis: Lenis) {
	lenisStore.set(lenis);
}

export function useScroll(callback: (...args: any[]) => void) {
	const lenisVal = get(lenisStore);

	const unsubscribe = lenisStore.subscribe((lenis) => {
		lenis?.on('scroll', callback);
		lenis?.emit();
	});

	onMount(() => {
		return () => {
			lenisVal?.off('scroll', callback);
			unsubscribe();
		};
	});
}

export interface Rect {
	height: number;
	width: number;
	top: number;
	left: number;
}

const DEFAULT_RECT = { height: 0, width: 0, top: 0, left: 0 };

export function useRect(lazy: boolean = false, debounce = 1000) {
	let node: HTMLElement | null;
	let resizeObserver: ResizeObserver;

	const rectStore = writable<Rect>(DEFAULT_RECT);
	const lazyRectStore = writable<Rect>(DEFAULT_RECT);

	const getRect = () => lazyRectStore;

	const resize = () => {
		const top = offsetTop(node);
		const left = offsetLeft(node);

		let newRect: Rect;
		lazyRectStore.update((pre) => {
			newRect = Object.assign({}, pre, { top, left });

			if (!lazy) {
				rectStore.set(newRect);
			}

			return newRect;
		});
	};

	const onResizeObserver = (entries: ResizeObserverEntry[]) => {
		const [entry] = entries;
		const { width, height } = entry.contentRect;

		let newRect: Rect;
		lazyRectStore.update((pre) => {
			newRect = Object.assign({}, pre, { width, height });

			if (!lazy) {
				rectStore.set(newRect);
			}

			return newRect;
		});
	};

	const unobserve = () => {
		if (node) resizeObserver?.unobserve(node);
		resizeObserver?.unobserve(document.body);
		resizeObserver?.disconnect();
	};

	const setRef = (elm: HTMLElement) => {
		if (!elm || elm === node) return;
		node = elm;

		unobserve();
		resize();

		resizeObserver = new ResizeObserver(onResizeObserver);
		resizeObserver.observe(node);

		// node.dispatchEvent(new Event('resize'));
	};

	// Observer "document.body" by default
	// let callback: throttle<() => void>;
	// if (browser) {
	// 	let callback = throttle(debounce, resize);
	// 	resizeObserver = new ResizeObserver(callback);
	// 	resizeObserver.observe(document.body);
	// }

	onMount(() => {
		return () => {
			unobserve();
			// callback?.cancel({ upcomingOnly: true });
		};
	});

	return [setRef, rectStore] as const;
}

// offsetTop function returns the offsetTop value of a DOM element.
// The offsetTop value is the distance between the top of the element
// and the top of the viewport.
export function offsetTop(element: HTMLElement | null, accumulator = 0): number {
	if (!element) return 0;

	const top = accumulator + element.offsetTop;
	if (element.offsetParent) {
		return offsetTop(element.offsetParent as HTMLElement, top);
	}
	return top;
}

// offsetLeft function returns the offsetLeft value of a DOM element.
// The offsetLeft value is the distance between the left of the element
// and the left of the viewport.
export function offsetLeft(element: HTMLElement | null, accumulator = 0): number {
	if (!element) return 0;

	const left = accumulator + element.offsetLeft;
	if (element.offsetParent) {
		return offsetLeft(element.offsetParent as HTMLElement, left);
	}

	return left;
}

export function useMediaQuery(queryString: string) {
	const mediaQuery = (() => {
		if (browser) {
			try {
				return window.matchMedia(queryString);
			} catch (error) {
				if (process.env.NODE_ENV !== 'production') {
					console.error(error);
				}
			}
		}

		return null;
	})();

	const isMatch = writable<boolean>(false);

	const onChange = ({ matches }: { matches: boolean }) => {
		isMatch.set(!!matches);
	};

	const opts = Object.defineProperty({}, 'passive', {
		get: function () {
			return true;
		}
	});

	if (mediaQuery) {
		onChange(mediaQuery);
		mediaQuery.addEventListener('change', onChange, opts);
	}

	onMount(() => {
		return () => {
			mediaQuery?.removeEventListener('change', onChange, opts);
		};
	});

	return isMatch;
}


interface Size {
	width: number;
	height: number;
}

export function useWindowSize(initialWidth = Infinity, initialHeight = Infinity) {
	const state = writable<Size>({ width: initialWidth, height: initialHeight });
	let frame = 0;

	const setRafState = (value: Size) => {
		cancelAnimationFrame(frame);

		frame = requestAnimationFrame(() => {
			state.set(value);
		});
	};

	const handler = () => {
		setRafState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	};

	onMount(() => {
		handler();
		window.addEventListener('resize', handler);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', handler);
		};
	});

	return [state, handler] as const;
}


function clamp(min: number, input: number, max: number) {
	return Math.max(min, Math.min(input, max));
}

function mapRange(in_min: number, in_max: number, input: number, out_min: number, out_max: number) {
	return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function lerp(start: number, end: number, amt: number) {
	return (1 - amt) * start + amt * end;
}

function truncate(value: number, decimals: number) {
	return parseFloat(value.toFixed(decimals));
}

const Maths = { lerp, clamp, mapRange, truncate };

export { Maths as default, lerp, clamp, mapRange, truncate };
