import { writable } from 'svelte/store'
import { promptStore, botsList, botStore } from '$lib/stores/gptprompt';

let prompt = promptStore

function findBotByPrompt(prompt:any){
    return botsList.find(bot => bot.prompt === prompt)
}

let currentBot, currentName, currentImage, currentAbout;

$: {
  currentBot = findBotByPrompt(promptStore);
  currentName = currentBot ? currentBot.name : undefined;
  currentImage = currentBot ? currentBot.image : undefined;
  currentAbout = currentBot ? currentBot.about : undefined;
}