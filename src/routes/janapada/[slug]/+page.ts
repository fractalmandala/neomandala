import supabase from '$lib/utils/supastream'

export async function load({params}:{params: { slug:string }}){
	const { data, error } = await supabase
	.from('db-janapada')
	.select()
	.eq('title',`${params.slug}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}