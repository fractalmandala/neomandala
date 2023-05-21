<script lang="ts">

    import { browser } from '$app/environment'
    import { chatMode } from '$lib/stores/globalstores'
	import { hideModal } from '$lib/stores/modalstores';
    let VITE_APP_KEY = 'dubhugolam'
    let messageTrue = 'Success!'
    let messageFalse = 'Invalid!'
    let content:any = ''
    let submitValue:any

	function toggleChat() {
		if (browser) {
			chatMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('chatMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

	const handleSubmit = async () => {
        const response = await fetch('/api/key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputKey: submitValue })       
        });
        if (response.ok) {
            const { message } = await response.json();
                console.log(message); // Handle successful response here.
                toggleChat();
                hideModal();
            } else {
                content = 'Incorrect password';  // Handle error here.
        }
    }




</script>

<div class="rta-column rowgap100">
<form class="rta-row colgap100" on:submit|preventDefault={handleSubmit}>
    <input type="password" bind:value={submitValue}/>
    <button class="mainbutton" type="submit">Submit</button>
</form>
<p><strong>{content}</strong></p>
</div>

<style lang="sass">




</style>