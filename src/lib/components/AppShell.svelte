<script lang="ts">

    import { onMount } from 'svelte'
    import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
    import '$lib/styles/theme.sass'
    import '$lib/styles/typography.sass'
    import Modal from '$lib/components/Modal.svelte'
    import { showDrawer, hideDrawer, initialDrawer, drawerStore, audioStore } from '$lib/stores/modalstores'
    import TransitionPage from '$lib/components/TransitionPage.svelte'
    import Motif from '$lib/assets/Loader.svelte'
    import Drawer from '$lib/components/Drawer.svelte'
    import Search from '$lib/icons/Search.svelte'
    import Dark from '$lib/icons/DarkMode.svelte'
    export let data:any
    let audioElement:any
    let timeIs = false

    function toggleDrawer(){
        if ( timeIs === false ) {
            showDrawer();
            timeIs = !timeIs
        } else {
            hideDrawer();
            timeIs = !timeIs
        }
    }

    onMount(() => {
        audioElement = new Audio('/sounds/boing2.mp3')
        audioStore.set(audioElement)
    })

</script>

<div class="app-shell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <section class="menubar">
        <div class="rta-column rowgap100 null">
            <a href="/">
                <Motif/>
            </a>
            <p>AI</p>
            <p><a class="hover" href="/bot">Bot</a></p>
            <p><a class="hover" href="/word">Word</a></p>
            <p><a class="hover" href="/code">Code</a></p>
            <p><a href="/sound" class="hover">Sound</a></p>
            <p><a class="hover" href="/image">Image</a></p>
            <p><a href="/video" class="hover">Video</a></p>
            <p><a href="/build" class="hover">Build</a></p>
        </div>
        <div class="row-column rowgap500">
            <button class="blank-button m-bot-16"
              on:click={toggleDrawer}
              >
                <Search/>
            </button>
            <Dark/>
        </div>
    </section>
    <section class="pagearea">
        <div class="rta-grid grid2 right00 screen fullH cushion back">
            <div class="rta-grid colgap300 rowgap100">
                {#key data.pathname}
                    <TransitionPage>
                        <slot/>
                    </TransitionPage>
                {/key}
            </div>
        </div>
        <div class="rta-column titlebox null">
            <slot name="titlebox"></slot>
        </div>
    </section>
    <Modal/>
    <Drawer/>
    <audio src="/sounds/boing2.mp3"/>

</div>

<style lang="sass">

.app-shell
    display: grid
    grid-auto-flow: row
    width: 100vw
    .menubar
        grid-area: menubar
    .pagearea
        grid-area: pagearea
        transition: 0.43s

.app-shell.light
    background: white

.app-shell.dark
    background: #121212


.app-shell.levelzero
    grid-template-columns: 96px 1fr
    grid-template-areas: "menubar pagearea"
    min-height: 100vh
    .menubar
        height: 100vh
        width: 96px
        padding-left: 24px
        padding-top: 32px
        padding-bottom: 32px
        position: sticky
        top: 0
        left: 0
        display: flex
        flex-direction: column
        justify-content: space-between


.menubar
    p
        text-transform: uppercase

</style>