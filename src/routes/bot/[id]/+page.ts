import { get } from 'svelte/store'
import { chatSessions } from '$lib/gpt/chatstore'

export async function load({params}:{params: { id:string }}){
	console.log(params)
	const id = params.id
	console.log(get(chatSessions)); 
	const data = get(chatSessions).find(c => c.id === id)
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