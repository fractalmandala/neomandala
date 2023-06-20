import supabase from '$lib/utils/supastream'

export async function load({params}:{params: { post:string }}){
	const { data, error } = await supabase
	.from('db-thea')
	.select()
	.eq('title',`${params.post}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}