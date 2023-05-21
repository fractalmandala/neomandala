const chainer = (editor:any, fn:any) => editor.chain().focus()[fn]().run();

const toggleBold = (editor: any) => chainer(editor, 'toggleBold');
const toggleItalic = (editor: {chain: () => {(): any; new(): any; focus: {(): {(): any; new(): any; toggleItalic: {(): {(): any; new(): any; run: {(): any; new(): any;};}; new(): any;};}; new(): any;};};}) => editor.chain().focus().toggleItalic().run();
const toggleStrike = (editor: {chain: () => {(): any; new(): any; focus: {(): {(): any; new(): any; toggleStrike: {(): {(): any; new(): any; run: {(): any; new(): any;};}; new(): any;};}; new(): any;};};}) => editor.chain().focus().toggleStrike().run();

export { toggleBold, toggleItalic, toggleStrike };