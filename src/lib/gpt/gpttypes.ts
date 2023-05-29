export interface ChatMessage {
	chatID: string;
	agent: string;
	message: string;
	createdAt: number;
}

export interface ChatStream {
	id: string;
	title: string;
	messages: ChatMessage[];
	bot: string;
	createdAt: number;
	updatedAt: number;
}

export interface GPTBot {
	name: string;
	prompt: string;
	greeting: string;
	about: string;
	id: string;
}
