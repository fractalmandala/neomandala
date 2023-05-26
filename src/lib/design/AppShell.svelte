<script lang="ts">
    
    import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores'
    import '$lib/styles/shell.sass'

</script>


<div class="rta-shell"
    class:levelzero={$breakZero}
    class:levelone={$breakOne}
    class:leveltwo={$breakTwo}
    class:light={$themeMode}
    class:dark={!$themeMode}
    >
    <div class="rta-column rta-main">
        <slot name="main"></slot>
    </div>
    <div class="rta-column column-row rta-side">
        <slot name="side"></slot>
    </div>
</div>


<style lang="sass">


.rta-shell
    display: grid
    grid-auto-flow: row

.rta-shell.dark
    background-color: hsla(0,0%,8%,1)
    background-image: radial-gradient(at 57% 35%, hsla(108,80%,5%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(116,86%,5%,1) 0px, transparent 50%)

.rta-shell.light
    background-color: hsla(0,0%,100%,1)
    background-image: radial-gradient(at 87% 95%, hsla(130,100%,62%,0.75) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(99,83%,49%,1) 0px, transparent 0%)

.rta-shell.levelzero
    grid-template-columns: 96px 1fr
    grid-template-areas: "side main"
    .rta-main
        grid-area: main
    .rta-side
        grid-area: side
        width: 96px
        text-align: left
        height: 100vh
        position: sticky
        top: 0
        left: 0 

.rta-shell.levelone
    grid-template-columns: 96px 1fr
    grid-template-areas: "side main"
    .rta-main
        grid-area: main
    .rta-side
        grid-area: side
        width: 96px
        padding: 24px
        text-align: left
        height: 100vh
        position: sticky
        top: 0
        left: 0

.rta-shell.leveltwo
    grid-template-columns: 1fr
    grid-template-areas: "side" "main"
    grid-template-rows: auto auto
    width: 100vw
    .rta-main
        grid-area: main
    .rta-side
        grid-area: side
        width: 100%
        padding: 32px
        text-align: left
        display: flex
        flex-direction: row
        

</style>