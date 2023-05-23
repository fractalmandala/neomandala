import { showChip } from '$lib/stores/modalstores'

import supabase from '$lib/utils/supabase'

export async function signInWithEmail(email:any, password:any) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  if (error) {
    console.log(error)
    showChip('invalid!','#fe4a49')
  } else {
    showChip('LOGGED IN!','#10D56C')
    console.log(data)
  }
}