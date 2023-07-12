import type { ComponentType } from "svelte";
	export interface ContentElement {
		/** name of element */
		name: string;

		/** text to add */
		text: string;

		/** controls how the text is added */
		display: "inline" | "block" | "wrap";

		/** contents of the button */
		icon: string | ComponentType;

		/** keyboard shortcut */
		key?: string;

		/** class to apply to the specific button */
		class?: string;
	}