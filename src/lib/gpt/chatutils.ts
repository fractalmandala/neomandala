import { v4 as uuidv4 } from 'uuid';
import BotsData from '$lib/gpt/bots.json';
import type { GPTBot } from '$lib/gpt/gpttypes';

export function generateUUID() {
	const sessionID = uuidv4();
	return sessionID;
}

function nameToId(name: string) {
	return name.toLowerCase().split(' ').join('-');
}

export const BotsList: GPTBot[] = BotsData.map((bot) => ({
	name: bot.name,
	prompt: bot.prompt,
	greeting: bot.greeting,
	about: bot.about,
	id: nameToId(bot.name)
}));

export const BotMap: Map<string, GPTBot> = BotsList.reduce((map, bot) => {
	map.set(bot.id, bot);
	return map;
}, new Map());

export function GetBotNameByBotId(botId: string): string {
	return BotMap.get(botId)?.name || 'GPT';
}

export function GetBotById(botId: string) {
	return BotMap.get(botId);
}
