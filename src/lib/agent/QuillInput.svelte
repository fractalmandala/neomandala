<script lang="ts">
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { history } from '@milkdown/plugin-history';
	import { prism } from '@milkdown/plugin-prism';
	import { nord } from '@milkdown/theme-nord';
	import { TooltipProvider, tooltipFactory } from '@milkdown/plugin-tooltip';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import '$lib/styles/prism.css';

	const markdown = `yes`;

	function tooltipPluginView(this: any, view: any) {
		const content = document.createElement('div');

		const provider = new TooltipProvider({
			content: this.content
		});

		return {
			update: (updatedView: any, prevState: any) => {
				provider.update(updatedView, prevState);
			},
			destroy: () => {
				provider.destroy();
				content.remove();
			}
		};
	}

	const tooltip = tooltipFactory('my-tooltip');

	function editor(dom: any) {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, markdown);
				ctx.set(tooltip.key, {
					view: tooltipPluginView
				});
			})
			.config(nord)
			.use(commonmark)
			.use(history)
			.use(prism)
			.use(tooltip)
			.use(clipboard)
			.create();
	}
</script>

<div use:editor />
