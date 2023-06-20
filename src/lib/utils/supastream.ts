import { createClient } from '@supabase/supabase-js';
import { showNote } from '$lib/dash/alerts'

const supabase = createClient(
	import.meta.env.VITE_SUPATWO_URL,
	import.meta.env.VITE_SUPATWO_ANON_KEY
);

export default supabase;

export async function allJanapada(){
	const { data, error } = await supabase
	.from('db-janapada')
	.select()
	.order('id')
	if ( error ) throw new Error(error.message)
	return data
}

export async function allThea(){
	const { data, error } = await supabase
	.from('db-thea')
	.select()
	.order('id')
	if ( error ) throw new Error(error.message)
	return data
}

export async function allNotes(){
	const { data, error } = await supabase
	.from('db-notes')
	.select()
	.order('id')
	if ( error ) throw new Error(error.message)
	return data
}

export async function saveJanapada(content: string, id: number){
	const { error } = await supabase
	.from('db-janapada')
	.update({ content: content })
	.eq('id', id)
	if (error) {
		showNote('error!', true)
	} else showNote('done!', false)
}

export async function saveThea(content: string, id: number){
	const { error } = await supabase
	.from('db-thea')
	.update({ content: content })
	.eq('id', id)
	if (error) {
		showNote('error!', true)
	} else showNote('done!', false)
}

export async function saveNote(content: string, id: number){
	const { error } = await supabase
	.from('db-notes')
	.update({ content: content })
	.eq('id', id)
	if (error) {
		showNote('error!', true)
	} else showNote('done!', false)
}