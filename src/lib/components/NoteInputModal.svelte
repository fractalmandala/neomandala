<script lang="ts">

    import { browser } from '$app/environment'
    import supabase from '$lib/utils/supabase'
    import { chatMode } from '$lib/stores/globalstores'
	import { hideModal } from '$lib/stores/modalstores';
    import { toastStore, showToast, hideToast } from '$lib/stores/modalstores'
    import Rich from '$lib/components/RichInput.svelte'
    let messageTrue = 'Success!'
    let messageFalse = 'Invalid!'
    let submitValue:any
    let title = ''
    let content = ''
    let tags = ''
    let snippet = ''
    let language = ''
    
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


<form class="rta-column null formA" on:submit|preventDefault={() => insertNote()}>
	<input type="text" placeholder="title" bind:value={title} />
	<textarea placeholder="content" bind:value={content} />
	{#if isTag}
		<input type="text" placeholder="tags" bind:value={tags} />
	{/if}
	{#if isSnip}
		<textarea placeholder="code" bind:value={snippet} />
		<select bind:value={language}>
			<option value="html">html</option>
			<option value="typescript">typescript</option>
			<option value="sass">sass</option>
			<option value="sql">sql</option>
			<option value="shell">shell</option>
		</select>
	{/if}
	<div class="rta-column rowgap200">
		<div class="rta-column rowgap50 optionals">
			<small>Optionals:</small>
			<div class="rta-row colgap100 ycenter">
				<div class="rta-row input-label ycenter">
					<input type="checkbox" id="tag" on:click={toggleTag} />
					<label for="tag">Tag</label>
				</div>
				<div class="rta-row input-label ycenter">
					<input type="checkbox" id="snip" on:click={toggleSnip} />
					<label for="snip">Snip</label>
				</div>
				<div class="rta-row input-label ycenter">
					<input type="checkbox" id="bool" on:click={toggleFeat} />
					<label for="bool">
						{#if isFeat}
							TRUE
						{:else}
							Feat
						{/if}
					</label>
				</div>
			</div>
		</div>
		<button class="mainbutton" type="submit">Submit</button>
	</div>
</form>

<style lang="sass">




</style>