import { notesDiary } from '$lib/dash/notesutil'
import { get } from 'svelte/store'

export async function load({params}:{params: { id:string }}){
	console.log(params)
	const id = params.id
	console.log(get(notesDiary)); 
	const data = get(notesDiary).find(c => c.id === id)
	console.log(data); 
	if (!data) {
		    return {
      status: 404,
      error: new Error('Code not found')
    };
	}
console.log({data, pageID: id});  //
return data
}