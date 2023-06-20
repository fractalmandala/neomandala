import supabase from '$lib/utils/supastream'

export async function load({params}:{params: { note:string }}){
	const { data, error } = await supabase
	.from('db-notes')
	.select()
	.eq('title',`${params.note}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}