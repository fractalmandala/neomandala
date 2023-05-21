import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { id:any }}){
	const { data, error } = await supabase
	.from('amrit-notes')
	.select()
	.eq('id',`${params.id}`)
    .eq('tags','gpt')
	.single()
	if (error) throw new Error(error.message)
	return data	
}