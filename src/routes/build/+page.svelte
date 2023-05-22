<script lang="ts">

	import { showModal, showToast } from '$lib/stores/modalstores';
    import ModalSub from '$lib/components/ModalSub.svelte'
    import TextBox from '$lib/components/RichInput.svelte'
    import { toastStore, hideToast } from '$lib/stores/modalstores'
    import BotSelector from '$lib/agent/BotSelector.svelte'
    import Hor from '$lib/lenis/Horizontal.svelte'
    import supabase from '$lib/utils/supabase'
    import { readingMode } from '$lib/stores/globalstores'
	import { audioStore } from '$lib/stores/modalstores';
    import '$lib/styles/design.sass'
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;

    let title:any
    let content:any
    let tags: any
    let snip:any
    let editor:any

    let isTag = false
    let isSnip = false
    let isFull = false


	function fauxfake() {
		fake = !fake;
	}

	let inputValue = '';

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

<div class="rta-grid grid2 right00 minH cushion">
	<div class="rta-column rowgap200 postgrid">
        <div class="rta-column minH">
            <Hor>
        <div class="rta-image height-60">
		    <img src="/images/psychedelic.webp" alt="psychedelic" />
        </div>
            </Hor>
        </div>
		<button on:click={() => showModal('Password Check', 'Please enter password.', ModalSub, {content: 'Try'})}>Show modal</button>
        <button on:click={() => showToast('Hello!')}>Show Toast</button>
	</div>
	<div class="rta-column titlebox null" class:invisible={$readingMode}>
		<img
			class="jello-vertical"
			src="/images/k-build.png"
			alt="writing"
			on:mouseover={() => audio.play()}
			on:focus={fauxfake}
		/>
		<h3 class="tt-u">build</h3>
		<p class="grey">felt cute, might build something.</p>
	</div>
</div>
