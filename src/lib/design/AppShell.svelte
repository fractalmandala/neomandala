<script lang="ts">
    
    import { breakZero, breakOne, breakTwo, themeMode, readingMode } from '$lib/stores/globalstores'
import ArrowUp from '$lib/components/ArrowUp.svelte'
import Read from '$lib/icons/Reading.svelte'

</script>


<div class="appshell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="rta-column main">
        <slot name="main"></slot>
    </div>
    <div class="rta-column side">
        <slot name="side"></slot>
    </div>
    <div class="rta-row fixedicons colgap100">
        <ArrowUp/>
        <Read/>
    </div>
</div>


<style lang="sass">

.fixedicons
    position: fixed
    bottom: 32px
    left: 128px

.appshell
    display: grid
    grid-auto-flow: row

.appshell.levelzero
    grid-template-columns: 280px 1fr
    grid-template-areas: "side main"
    position: relative
    width: calc(100vw - 96px)
    .main
        grid-area: main
        padding: 64px 4vw
    .side
        grid-area: side
        width: 280px
        padding-top: 32px
        text-align: left
        height: 100vh
        position: sticky
        top: 0
        left: 0

.appshell.levelone
    grid-template-columns: 240px 1fr
    grid-template-areas: "side main"
    width: calc(100vw - 96px)
    .main
        grid-area: main
        padding: 64px 32px
    .side
        grid-area: side
        width: 240px
        padding-top: 32px
        text-align: left
        height: 100vh
        position: sticky
        top: 0
        left: 0

.appshell.leveltwo
    grid-template-columns: 1fr
    grid-template-areas: "side" "main"
    grid-template-rows: auto auto
    width: 100vw
    .main
        grid-area: main
        padding: 32px
    .side
        grid-area: side
        width: 100%
        padding: 32px
        text-align: left
        

</style>