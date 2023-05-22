<button class="glassbutton">
	<span class="pane1"></span>
	<span class="pane2"></span>
	<span class="pane3"></span>
	<span class="pane4"></span>
	Glass Button
</button>

<style lang="sass">

.glassbutton
	position: relative
	border: none
	color: white
	height: 48px
	background: rgba(255,255,255,0.01)
	font-size: 16px
	border-radius: 6px
	&:hover
		.pane1
			animation: anim1 0.07s ease forwards
		.pane2
			animation: anim2 0.07s ease
		.pane3
			animation: anim3 0.07s ease forwards
		.pane4
			animation: anim4 0.07s ease forwards

@keyframes anim2
	0%
		margin-left: 0
		width: 100%
	50%
		margin-left: 50%
		width: 50%
	100%
		margin-left: 100%
		width: 0%


.pane1
	position: absolute
	top: 0
	left: 0
	width: 2px
	height: 100%
	border-radius: 6px
	background: linear-gradient(180deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))

.pane2
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 2px
	border-radius: 6px
	background: linear-gradient(90deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))

.pane3
	position: absolute
	right: 0
	bottom: 0
	width: 2px
	height: 100%
	border-radius: 6px
	background: linear-gradient(-120deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))

.pane4
	position: absolute
	bottom: 0
	left: 0
	height: 2px
	width: 100%
	border-radius: 6px
	background: linear-gradient(90deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))


</style>