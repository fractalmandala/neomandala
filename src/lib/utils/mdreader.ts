// readMarkdown.ts
import fs from 'fs';
import marked from 'marked';

export function readMarkdownFile(path: string): string {
	const content = fs.readFileSync(path, 'utf8');
	return marked(content);
}

// contentTypes.ts
export interface MarkdownContent {
	content: string;
}
