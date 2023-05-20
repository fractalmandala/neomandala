<script lang="ts">

import { onMount } from 'svelte'
import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores'
import '$lib/styles/theme.sass'
import '$lib/styles/typography.sass'
import TransitionPage from '$lib/components/TransitionPage.svelte'
import Modal from '$lib/components/Modal.svelte'
import { showDrawer, hideDrawer, initialDrawer, drawerStore, audioStore } from '$lib/stores/modalstores'
import Drawer from '$lib/components/Drawer.svelte'
import Search from '$lib/icons/Search.svelte'
import Dark from '$lib/icons/DarkMode.svelte'
import '$lib/styles/animate.css'
import Motif from '$lib/assets/Loader.svelte'

let timeIs = false
let audioElement:any

function toggleDrawer(){
    if ( timeIs === false ) {
        showDrawer();
        timeIs = !timeIs
    } else {
        hideDrawer();
        timeIs = !timeIs
    }
}

function theShift(){
 timeIs = !timeIs
 showDrawer();
}

onMount(() => {
    audioElement = new Audio('/sounds/boing2.mp3')
    audioStore.set(audioElement)
})


export let data

</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</svelte:head>

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
        {#key data.pathname}
            <TransitionPage>
                <slot/>
            </TransitionPage>
        {/key}
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
    background-color: hsla(143,6%,4%,1)
    background-image: radial-gradient(at 40% 20%, hsla(101,87%,5%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(97,72%,9%,0.1) 0px, transparent 50%)
    p
        color: white
        text-transform: uppercase

</style>