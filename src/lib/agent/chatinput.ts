import type { ChatCompletionRequestMessage } from 'openai';
import { SSE } from 'sse.js';

let chatMessages: ChatCompletionRequestMessage[] = [];
let query: string;
let answer: string;
const prompter =
	'For the data given to you, condense it into less than 50 words, of any syntax or code that works best for you, such that these 50 words given to you later will help you remember the entire context and history again. Do not worry about making this human-readable, since it is only for your memory.';

export const handleCondense = async () => {
	chatMessages = [...chatMessages, { role: 'user', content: query }];
	const eventSource = new SSE('/api/chat', {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({ messages: chatMessages, prompt: prompter })
	});
	eventSource.addEventListener('error', handleError);

	eventSource.addEventListener('message', (e: { data: string }) => {
		try {
			if (e.data === '[DONE]') {
				chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
				query = '';
				answer = '';
				return;
			}

			const completionResponse = JSON.parse(e.data);
			const [{ delta }] = completionResponse.choices;

			if (delta.content) {
				answer = (answer ?? '') + delta.content;
			}
		} catch (err) {
			handleError(err);
		}
	});
	eventSource.stream();
};

function handleError<T>(err: T) {
	console.error(err);
}
