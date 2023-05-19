import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase

export async function supaImages(low:number, top:number){
    const { data, error } = await supabase
    .from('amrit-gallery')
    .select()
    .order('id', {ascending: false})
    .range(low, top)
    if (error) throw new Error(error.message)
    return data
}

export async function gptTitles(low:number, top: number){
    const { data, error } = await supabase
    .from('amrit-gpttitles')
    .select()
    .order('nextid', {ascending: false})
    .range(low, top)
    if (error) throw new Error(error.message)
    return data
}



export async function thisChat(indexing:string){
    const { data, error } = await supabase
    .from('amrit-gpt')
    .select()
    .eq('indexing', indexing)
    .order('id', {ascending: false})
    if (error) throw new Error(error.message)
    return data    
}