

<script lang="ts">


    export let dimension = 24

</script>

<div class="rta-icon" style="width: {dimension}px; height: {dimension}px">
<svg width="{dimension}" height="{dimension}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.271 28.4065C5.64102 28.4065 5.10502 28.1855 4.663 27.7435C4.221 27.3015 4 26.7655 4 26.1355V6.279C4 5.64684 4.221 5.10898 4.663 4.6654C5.10502 4.2218 5.64102 4 6.271 4H26.1275C26.7597 4 27.2976 4.2218 27.7411 4.6654C28.1847 5.10898 28.4065 5.64684 28.4065 6.279V26.1355C28.4065 26.7655 28.1847 27.3015 27.7411 27.7435C27.2976 28.1855 26.7597 28.4065 26.1275 28.4065H6.271ZM6.271 13.3305V26.1355H26.1275V13.3305H6.271Z" fill="#474747"/>
<path d="M11.4826 22.4827L16.1993 17.758L20.9159 22.4827H11.4826Z" fill="#474747"/>
</svg>
</div>


<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg
			transform: scale(0.88)

</style>