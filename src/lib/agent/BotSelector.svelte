<script lang="ts">

	import {
		promptStore,
		nameStore,
		aboutStore,
		imageStore,
		greetStore,
		botsList,
	} from '$lib/stores/gptprompt';
    import { uuidStore } from '$lib/stores/globalstores';
	import supabase from '$lib/utils/supabase';
	import { showChip, showBots } from '$lib/stores/modalstores';
	import Left from '$lib/icons/ChevFLeft.svelte';
	import Right from '$lib/icons/ChevFRight.svelte';

	let isCard = Array(6).fill(false);
	let currentIndex = 0;
	let dimension = 27;

	function handleSelection(selection: any) {
		promptStore.set(selection);
		showBots.set(false);
	}

	isCard[currentIndex] = true;
	isCard[currentIndex + 1] = true;
	isCard[currentIndex + 2] = true;

	function toggleNext() {
		isCard[currentIndex] = false; // remove visibility from current card
		currentIndex = (currentIndex + 1) % isCard.length; // go to next card, loop back to 0 if at the end
		isCard[(currentIndex + 2) % isCard.length] = true; // make card 3 places ahead visible (or first card if at the end)
	}

	function togglePrevious() {
		isCard[(currentIndex + 2) % isCard.length] = false; // remove visibility from card 3 places ahead
		currentIndex = (currentIndex - 1 + isCard.length) % isCard.length; // go to previous card, loop to end if at the start
		isCard[currentIndex] = true; // make current card visible
	}
</script>

{#if $showBots}
	<div class="botselector">
		<div class="rta-grid grid3 colgap600">
			{#each botsList as bot, i}
				{#if isCard[i]}
					<div class="rta-column ybetween rowgap200 thisbox" class:current={isCard[i]}>
						<div class="rta-column rowgap400">
							<div class="rta-image">
								<img src={bot.image} alt={bot.name} />
							</div>
							<div class="rta-column null">
								<h4 class="tt-u">{bot.name}</h4>
								<em class="grey">{bot.about}</em>
							</div>
						</div>
						<button class="outbutton rta-column" on:click={() => handleSelection(bot.prompt)}>
							Select
						</button>
					</div>
				{/if}
			{/each}
		</div>
		<div class="navnav rta-row ycenter between">
			<button class="blank-button" on:click={togglePrevious}>
				<Left {dimension} />
			</button>
			<button class="mainbutton" style="height: 54%" on:click={() => showBots.set(false)}>
				Close
			</button>
			<button class="blank-button" on:click={toggleNext}>
				<Right {dimension} />
			</button>
		</div>
	</div>
{/if}

<style lang="sass">

.thisbox
    background: rgba(255,255,255,0)
    border: 2px solid transparent
    h4, em
        color: white
    button, em
        opacity: 0
    &:hover
        background: white
        h4
            color: #474747
        em
            color: #878787
        button, em
            opacity: 1

.botselector
    display: flex
    flex-direction: column
    position: fixed
    align-items: center
    justify-content: center
    row-gap: 48px
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background: rgba(0,0,0,0.6)
    backdrop-filter: blur(1px)
    z-index: 200

.rta-grid
    justify-items: center
    justify-content: center
    width: 80%

.thisbox
    padding: 32px 24px
    border-radius: 6px
    transform-origin: center center
    transition: 0.31s
    cursor: pointer
    img
        border-radius: 6px
    &:hover
        transform: scale(1.1)

.navnav
    height: 64px
    width: 60%
    background: rgba(255,255,255,1)
    border-radius: 6px
    padding: 0 128px

</style>
