import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { indexing:string }}){
	const { data, error } = await supabase
	.from('amrit-gpttitles')
	.select()
	.eq('indexing',`${params.indexing}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}