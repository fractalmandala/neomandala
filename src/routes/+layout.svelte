<script lang="ts">

import { onMount } from 'svelte'
import { breakZero, breakOne, breakTwo, themeMode, readingMode, windowWidth } from '$lib/stores/globalstores'
import '$lib/styles/theme.sass'
import '$lib/styles/typography.sass'
import { slide } from 'svelte/transition'
import TransitionPage from '$lib/components/TransitionPage.svelte'
import SideTrans from '$lib/components/SidebarTransition.svelte'
import ArrowUp from '$lib/components/ArrowUp.svelte'
import Read from '$lib/icons/Reading.svelte'
import Modal from '$lib/components/Modal.svelte'
import Chip from '$lib/components/Chip.svelte'
import NewNote from '$lib/components/NewNote.svelte'
import { showDrawer, hideDrawer, chipStore, initialDrawer, drawerStore, audioStore, toastStore, alertStore, noteStore } from '$lib/stores/modalstores'
import Drawer from '$lib/components/Drawer.svelte'
import Toast from '$lib/components/Toast.svelte'
import Alert from '$lib/components/Alert.svelte'
import Search from '$lib/icons/Search.svelte'
import Dark from '$lib/icons/DarkMode.svelte'
import Menu from '$lib/icons/Menu.svelte'
import '$lib/styles/animate.css'
import Motif from '$lib/assets/Loader.svelte'

let timeIs = false
let audioElement:any
let mobileMenu = false
let fake = false

function fauxfake(){
    fake = !fake
}

function toggleMenu(){
    mobileMenu = !mobileMenu
}

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

<svelte:window bind:innerWidth={$windowWidth}/>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JFGGCTBC9"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-1JFGGCTBC9');
	</script>
</svelte:head>

<div class="app-shell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    {#key data.pathname}
    <SideTrans>
    <section class="menubar">
        <div class="rta-column rowgap300 null">
            <a href="/">
                <Motif/>
            </a>
            {#if $breakZero || $breakOne || mobileMenu}
            <div class="rta-column rowgap200 barlinks" transition:slide on:click={toggleMenu} on:keydown={fauxfake}>
                <p><a class="hover" href="/bot">Bot</a></p>
                <p><a class="hover" href="/word">Word</a></p>
                <p><a class="hover" href="/code">Code</a></p>
                <p><a href="/sound" class="hover">Sound</a></p>
                <p><a class="hover" href="/image">Image</a></p>
                <p><a href="/video" class="hover">Video</a></p>
                <p><a href="/build" class="hover">Build</a></p>
            </div>
            {/if}
        </div>
        <div class="rowgap200 menulinks">
            <button class="blank-button"
              on:click={toggleDrawer}
              >
                <Search/>
            </button>
            <Dark/>
            {#if $breakTwo}
                <button class="blank-button" on:click={toggleMenu}>
                    <Menu/>
                </button>
            {/if}
        </div>
    </section>
    </SideTrans>
    {/key}
    <section class="pagearea">
        {#key data.pathname}
            <TransitionPage>
                <slot/>
            </TransitionPage>
        {/key}
    </section>
    <NewNote/>
    <Modal/>
    <Drawer/>
    <Toast/>
    <Alert/>
    <Chip/>
    <audio src="/sounds/boing2.mp3"/>
</div>

