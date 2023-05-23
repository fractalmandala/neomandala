import GPT3Tokenizer from 'gpt3-tokenizer';

let tokenizer: GPT3Tokenizer;

export interface ChatCost {
	tokensPrompt: number;
	tokensCompletion: number;
	tokensTotal: number;
	costPrompt: number;
	costCompletion: number;
	costTotal: number;
	maxTokensForModel: number;
}

export function countTokens(message: string): number {
	if (!tokenizer) {
		tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
	}
	let num_tokens = 4; // every message follows <im_start>{role/name}\n{content}<im_end>\n
	for (const [key, value] of Object.entries(message)) {
		if (key !== 'name' && key !== 'role' && key !== 'content') {
			continue;
		}
		const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(value);
		num_tokens += encoded.text.length;
		if (key === 'name') {
			num_tokens--; // if there's a name, the role is omitted
		}
	}

	const costPromptPer1K = 0.002;

	const costPrompt = (costPromptPer1K / 1000.0) * num_tokens;
	return costPrompt;
}
