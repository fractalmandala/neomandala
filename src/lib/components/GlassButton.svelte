<button class="glassbutton">
	<span class="pane1"></span>
	<span class="pane2"></span>
	<span class="pane3"></span>
	<span class="pane4"></span>
	<slot></slot>
</button>

<style lang="sass">

.glassbutton
	position: relative
	border: none
	color: white
	min-width: 160px
	height: 48px
	padding: 0 12px
	background: rgba(255,255,255,0.05)	
	border: 1px solid rgba(255,255,255,0.6)
	font-size: 16px
	border-radius: 6px
	overflow: hidden
	transform-origin: center center
	transition: 0.17s
	cursor: pointer
	&:hover
		.pane1
			animation: anim1 0.37s ease forwards
		.pane2
			animation: anim2 0.27s ease forwards
		.pane3
			animation: anim3 0.47s ease forwards
		.pane4
			animation: anim4 0.17s ease forwards
	&:hover
		transform: scale(0.96)

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

@keyframes anim4
	0%
		margin-left: 0
		width: 100%
	50%
		margin-left: 50%
		width: 50%
	100%
		margin-left: 100%
		width: 0%

@keyframes anim3
	0%
		margin-top: 0
		height: 100%
	50%
		margin-top: 50%
		height: 50%
	100%
		margin-top: 100%
		height: 0%

@keyframes anim1
	0%
		margin-top: 0
		height: 100%
	50%
		margin-top: 50%
		height: 50%
	100%
		margin-top: 100%
		height: 0%


.pane1
	position: absolute
	top: 0
	left: 0px
	width: 1px
	height: 100%
	border-radius: 6px
	background: linear-gradient(180deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 90%, rgba(17, 17, 17, 0))

.pane2
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 1px
	border-radius: 6px
	background: linear-gradient(90deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))

.pane3
	position: absolute
	right: 0
	bottom: 0
	width: 1px
	height: 100%
	border-radius: 6px
	background: linear-gradient(-120deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 20%, rgba(17, 17, 17, 0))

.pane4
	position: absolute
	bottom: 0
	left: 0
	height: 1px
	width: 100%
	border-radius: 6px
	background: linear-gradient(90deg, rgba(17, 17, 17, 0), rgb(255, 255, 255) 50%, rgba(17, 17, 17, 0))


</style>