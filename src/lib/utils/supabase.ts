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

export async function womboImages(){
    const { data, error } = await supabase
    .from('amrit-wombo')
    .select()
    .order('id', {ascending: false})
    if (error) throw new Error(error.message)
    return data
}

export async function thisImage(id:number){
    const { data, error } = await supabase
    .from('amrit-gallery')
    .select()
    .eq('id', id)
    if (error) throw new Error(error.message)
    return data
}

export async function gptTitles(){
    const { data, error } = await supabase
    .from('amrit-gpttitles')
    .select()
    .order('nextid', {ascending: false})
    if (error) throw new Error(error.message)
    return data
}



export async function thisChat(indexing:string){
    const { data, error } = await supabase
    .from('amrit-gpt')
    .select()
    .eq('indexing', indexing)
    .order('id')
    if (error) throw new Error(error.message)
    return data    
}

export async function allWritings(){
    const { data, error } = await supabase
    .from('amrit-posts')
    .select()
    .order('id', {ascending: false})
    if (error) throw new Error(error.message)
    return data
}

export async function thisWritings(slug:string){
    const { data, error } = await supabase
    .from('amrit-posts')
    .select()
    .eq('slug', slug)
    if (error) throw new Error(error.message)
    return data
}

export async function pageWritings(id:number){
    const { data, error } = await supabase
    .from('amrit-posts')
    .select()
    .eq('id', id)
    if (error) throw new Error(error.message)
    return data
}

export async function featuredWritings(){
    const { data, error } = await supabase
    .from('amrit-posts')
    .select()
    .eq('featured', true)
    .order('id', {ascending: false})
    if (error) throw new Error(error.message)
    return data
}

export async function gptStream(){
    const { data, error } = await supabase
    .from('amrit-notes')
    .select()
    .eq('tags', 'gpt')
    .order('id')
    if ( error ) throw new Error(error.message)
    return data
}