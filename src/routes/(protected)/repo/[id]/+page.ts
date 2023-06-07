import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { id:string }}){
	const { data, error } = await supabase
	.from('amrit-gpttitles')
	.select()
	.eq('id',`${params.id}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}