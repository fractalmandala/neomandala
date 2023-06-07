import { botsList } from '$lib/stores/gptprompt';

export function findBotByPrompt(prompt:any){
    return botsList.find(bot => bot.prompt === prompt)
}
