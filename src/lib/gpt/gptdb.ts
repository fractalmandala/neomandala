import supabase from '$lib/utils/supabase';

export async function gptBots() {
	const { data, error } = await supabase.from('gpt-bots').select().order('id');
	if (error) throw new Error(error.message);
	return data;
}
