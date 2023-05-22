import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { uuid:string }}){
	const { data, error } = await supabase
	.from('amrit-uuids')
	.select()
	.eq('uuid',`${params.uuid}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}