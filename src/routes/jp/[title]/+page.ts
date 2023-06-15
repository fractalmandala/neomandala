import { allWriteups } from '$lib/dash/notesutil'
import { get } from 'svelte/store'

export async function load({params}:{params: { title:string }}){
	console.log(params)
	const title = params.title
	console.log(get(allWriteups)); 
	const data = get(allWriteups).find(c => c.title === title)
	console.log(data); 
	if (!data) {
		  return {
      status: 404,
      error: new Error('Code not found')
    };
	}
console.log({data, pageID: title});  //
return data
}