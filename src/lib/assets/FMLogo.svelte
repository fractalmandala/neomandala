<div class="title">FRACTALMAṆḌALA</div>

<style lang="sass">

.title
	font-family: 'Space Grotesk', sans-serif
	font-weight: 400

div 
	&:before 
		animation: glitchTop 1s linear forwards
		clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%) 
		-webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%) 
	&:hover
		animation: glitch 0.45s linear forwards

@keyframes glitch 
	2%,64%
		transform: translate(2px,0) skew(0deg) 
		color: #272727
	4%,60%
		transform: translate(-2px,0) skew(0deg)
		transform: translate(-2px,2px)
		transform: translate(-2px,0)
	50%
		letter-spacing: 2px
	50.32%
		letter-spacing: 0
	62% 
		transform: translate(0,0) skew(5deg) 
		transform: translate(13px,-1px) skew(-13deg) 
		transform: translate(-22px,5px) skew(21deg) 
	100%
		color: #10D56C
	
@keyframes glitchTop 
	2%,64%
		transform: translate(2px,-2px) 
		color: #272727
	4%,60%
		transform: translate(-2px,0) skew(0deg)
		transform: translate(-2px,2px)
		transform: translate(-2px,0)
	62% 
		transform: translate(0,0) skew(5deg) 
		transform: translate(13px,-1px) skew(-13deg) 
		transform: translate(-22px,5px) skew(21deg) 
	
@keyframes glitchBotom 
	2%,64%
		transform: translate(-2px,0)
	4%,60%
		transform: translate(-2px,0) skew(0deg)
		transform: translate(-2px,2px)
		transform: translate(-2px,0)
	62% 
		transform: translate(0,0) skew(5deg) 
		transform: translate(13px,-1px) skew(-13deg) 
		transform: translate(-22px,5px) skew(21deg) 

div:before, div:after 
	content: attr(title) 
	position: absolute 
	left: 0 

div
	&:after 
		animation: glitchBotom 0.5s linear infinite 
		clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%) 
		-webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%) 



</style>