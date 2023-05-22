<script lang="ts">

    import { onMount } from 'svelte'
    import Toast from '$lib/components/Toast.svelte'
    import { readingMode } from '$lib/stores/globalstores'
    import { toastStore, showToast, hideToast } from '$lib/stores/modalstores'
	import { showNote, hideNote, noteStore } from '$lib/stores/modalstores';
    import NewNote from '$lib/components/NewNote.svelte'
    import supabase from '$lib/utils/supabase'
    import AppShell from '$lib/design/AppShell.svelte'
    import '$lib/styles/design.sass'
    import NoteAdd from '$lib/icons/NoteAdd.svelte'

    let title = ''
    let content = ''
    let tags = ''
    let snippet = ''
    let language = ''
    let newNotedd = 32
    
    let isSnip = false
    let isTag = false
    let isFeat = false
    let fake = false
    let featured:boolean = false

    function toggleSnip(){
        isSnip = !isSnip
    }

    function toggleTag(){
        isTag = !isTag
    }

    function toggleFeat(){
        isFeat = !isFeat
        if ( isFeat === true ) {
            featured = true
        }
    }

    function fauxfake(){
        fake = !fake
    }
    
    export async function insertNote(){
        const { error } = await supabase
        .from ('amrit-notes')
        .insert({ title: title, content: content})
        if (error) {
            throw new Error(error.message)
        } else {
            showToast('Success!')  
        }
        title = ''
        content = ''
    }

</script>


<AppShell>
    <div slot="main">
        <div class="notebook">
            
<button class="blank-button" on:click={() => showNote('New Note')}>
    <NoteAdd dimension={newNotedd}/>
</button>
        </div>
 
    </div>
    <div slot="side" class="rta-column null" class:invisible={$readingMode}>
        <h3>xint</h3>
        <small>nothing to see here...</small>
    </div>
</AppShell>