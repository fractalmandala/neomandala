<script lang="ts">
	import { indexName, indexCategory, indexLinks, indexTags } from '$lib/stores/globalstores';

	$indexName = 'tools';
	$indexCategory = '';
	$indexLinks = '';
	$indexTags = '';
</script>

<div class="rta-column grot rowgap200">
	<p>Here's my stack, current and past.</p>
	<p>
		As a novice web developer scaffolding his way up with generous helpings of AI-generated code,
		I've found Sveltekit an absolute delight. I was able to build on it with my pre-existing
		HTML/CSS knowledge and at least get a basic site going. Past that, the learning curve is quite
		smooth, and there are easy but fun discoveries. I'm currently on:
	</p>
	<ul>
		<li>
			Framework- <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">Sveltekit</a>
		</li>
		<li>
			IDE- <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer"
				>Visual Studio Code</a
			> But I'm kind of bored with it. And for some reason every few weeks it totally resets my config,
			code styling and such (probably because of something I'm missing.) I like Zed except for a few
			irritations that prohibit full migration.
		</li>
		<li>
			Graphic Design- <a href="https://www.figma.com/" target="_blank" rel="noreferrer">Figma</a>
		</li>
		<li>
			Database- <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a>
		</li>
		<li>
			Writing- I can pretty much get writing on any tool, and for the most part haven't felt a
			difference between "minimal, distraction-free" interfaces and their opposites. With its serif
			font and wide, clean layout though, it's fun to write on <a
				href="https://www.notion.so/"
				target="_blank"
				rel="noreferrer"
			>
				Notion.</a
			> These days though I've taken to markdown, and currently am testing a solution where I've set
			my Sveltekit project folder as a vault on Obsidian. This allows me to write on markdown files using
			Obsidian, and as they're saved I can push the changes to Github to make it all live on the website.
		</li>
	</ul>
	<p>
		In the past, I've played around a fair bit on Photoshop, Illustrator, 3DS Max, FL Studio (back
		when it was Fruity Loops) and Ableton Live.
	</p>
</div>

<style lang="sass">

p, li
	font-size: 16px

a
	color: #10D56C
	&:hover
		text-decoration: underline

.grot
	padding: 0

</style>
