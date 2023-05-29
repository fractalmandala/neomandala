<script lang="ts">
	export let dimension = 27;
</script>

<div class="rta-row ycenter">
	<svg
		width={dimension}
		height={dimension}
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.79062 19.1531H15.525V17.4656H7.79062V19.1531ZM7.79062 14.3437H19.2094V12.6562H7.79062V14.3437ZM7.79062 9.53437H19.2094V7.84687H7.79062V9.53437ZM5.0625 23.625C4.6125 23.625 4.21875 23.4562 3.88125 23.1187C3.54375 22.7812 3.375 22.3875 3.375 21.9375V5.0625C3.375 4.6125 3.54375 4.21875 3.88125 3.88125C4.21875 3.54375 4.6125 3.375 5.0625 3.375H21.9375C22.3875 3.375 22.7812 3.54375 23.1187 3.88125C23.4562 4.21875 23.625 4.6125 23.625 5.0625V21.9375C23.625 22.3875 23.4562 22.7812 23.1187 23.1187C22.7812 23.4562 22.3875 23.625 21.9375 23.625H5.0625Z"
			fill="url(#paint0_linear_18_49)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_18_49"
				x1="13.5"
				y1="3.375"
				x2="13.5"
				y2="23.625"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#20E27B" />
				<stop offset="1" stop-color="#04A932" />
			</linearGradient>
		</defs>
	</svg>
</div>

<style lang="sass">

.rta-row
	cursor: pointer
	svg
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
		padding-bottom: 2px
	&:hover
		svg path
			fill: var(--green)
		svg
			transform: scale(0.88)

</style>
