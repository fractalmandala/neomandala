/* eslint-disable @typescript-eslint/no-unused-vars */
import { readable, writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { Writable, Readable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { SSE } from 'sse.js';
import type { ChatCompletionRequestMessage } from 'openai';
let chatMessages: ChatCompletionRequestMessage[] = [];

export interface Message {
	query: string;
	answer: string;
	timestamp: string;
}

export interface ChatSession {
	id: string;
	sessionprompt: string;
	messages: Message[];
	createdAt: string;
	sessionbot: string;
}

export function createLocalStorageStore<T>(key: string, startValue: T): Writable<T> {
	const initialValue: T =
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		browser && localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : startValue;

	const store: Writable<T> = writable(initialValue);

	if (browser) {
		store.subscribe((value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

export const chatSessions = createLocalStorageStore<ChatSession[]>('chatSessions', []);

export function getSessionById(sessionId: string): ChatSession | undefined {
	const sessions = get(chatSessions); // get the current value of the chatSessions store
	return sessions.find((session) => session.id === sessionId); // find and return the session with the given id
}

export const deleteBool = writable(false);

export function deleteChatSession(chatSessionId: string) {
	chatSessions.update((sessions) => sessions.filter((session) => session.id !== chatSessionId));
}

const initialDelete = {
	isShown: false,
	title: 'Delete Chat',
	message: 'Are you sure?',
	deleteID: ''
};

export const deleteStore = writable(initialDelete);

export function showDelete(deleteID: string) {
	deleteStore.update((state) => ({ ...state, isShown: true, deleteID }));
}

export function hideDelete() {
	deleteStore.update((state) => ({
		...state,
		isShown: false,
		title: 'Delete Chat',
		message: 'Are you sure?',
		deleteID: ''
	}));
}

export function updateSessionId(oldId: string, newId: string) {
	chatSessions.update((sessions) => {
		const session = sessions.find((session) => session.id === oldId);
		if (session) {
			session.id = newId;
		}
		return sessions;
	});
}

export function concatenateQueriesFromSession(sessionId: string) {
	const sessions = get(chatSessions); // get the actual array stored in chatSessions
	const session = sessions.find((session) => session.id === sessionId);
	if (session) {
		return session.messages.map((message) => message.query).join(' ');
	} else {
		console.error(`Session with id ${sessionId} not found`);
		return '';
	}
}

let answer: string;

function whenMoreThanThree(session: ChatSession) {
	const concatValue = concatenateQueriesFromSession(session.id);
	chatMessages = [...chatMessages, { role: 'user', content: concatValue }];
	const eventSource = new SSE('/api/title', {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({ messages: chatMessages })
	});

	eventSource.addEventListener('error', handleError);

	eventSource.addEventListener('message', (e: { data: string }) => {
		try {
			if (e.data === '[DONE]') {
				chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
				console.log(answer);
				updateSessionId(session.id, answer);
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
}

function handleError<T>(err: T) {
	console.error(err);
}
