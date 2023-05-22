<script lang="ts">

    export let dimension1 = 24
    export let dimension = 20

</script>
<div class="rta-icon" style="width: {dimension1}; height: {dimension1}">
<svg width="{dimension}" height="{dimension}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" fill="#0BC160"/>
<path d="M12.6 24.6L4.33334 16.3334L6.6 14.0667L12.6 20.0667L25.3667 7.30005L27.6333 9.56672L12.6 24.6Z" fill="white"/>
</svg>

</div>

<style lang="sass">

.rta-icon
    height: 24px
    cursor: pointer
    svg
        object-fit: contain
    &:hover
        svg
            border: 2px solid var(--green)
            border-radius: 2px
        svg path
            fill: #0bc160
        svg rect
            fill: white

</style>