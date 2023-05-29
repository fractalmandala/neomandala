import supabase from '$lib/utils/supabase';
import { showChip } from '$lib/stores/modalstores';

export async function gptBots() {
	const { data, error } = await supabase.from('gpt-bots').select().order('id');
	if (error) throw new Error(error.message);
	return data;
}

export async function selectBot(id: number) {
	const { error } = await supabase.from('gpt-bots').update({ active: true }).eq('id', id);
	if (error) showChip('error!', '#fe4a49');
}

export async function deselectBot(id: number) {
	const { error } = await supabase.from('gpt-bots').update({ active: null }).eq('id', id);
	if (error) showChip('error!', '#fe4a49');
}

export async function onPrompt() {
	const { data, error } = await supabase.from('gpt-bots').select('prompt').eq('active', true);
	if (error) showChip('error!', '#fe4a49');
	return data;
}

export async function inputMessage(session: string, message: string, agent: string) {
	const { error } = await supabase
		.from('gpt-sessions')
		.insert({ session: session, content: message, agent: agent });
	if (error) showChip('error!', '#fe4a49');
	return showChip('sent!', '#10D56C');
}

export async function vlookupBot(prompt: string) {
	const { data, error } = await supabase.from('gpt-bots').select().eq('prompt', prompt);
	if (error) throw new Error(error.message);
	return data;
}
