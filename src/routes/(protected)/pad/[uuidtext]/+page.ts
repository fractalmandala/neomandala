import supabase from '$lib/utils/supabase';

export async function load({ params }: { params: { uuidtext: string } }) {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('uuidtext', `${params.uuidtext}`)
		.eq('agent', 'article')
		.single();
	if (error) throw new Error(error.message);
	return data;
}
