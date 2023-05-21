<script lang="ts">
    
    import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores'

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
</div>


<style lang="sass">

.appshell
    display: grid
    grid-auto-flow: row

.appshell.levelzero
    grid-template-columns: 1fr 200px
    grid-template-areas: "main side"
    padding-right: 48px
    .main
        grid-area: main
        padding: 64px 48px
    .side
        grid-area: side
        width: 200px
        padding-top: 64px
        text-align: right

</style>