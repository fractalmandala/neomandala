<script lang="ts">
	import {
		indexName,
		indexCategory,
		indexLinks,
		indexTags,
		pageTitle,
		pageDescription,
		shareImage,
		pageUrl
	} from '$lib/stores/globalstores';

	$indexCategory = '';
	$indexName = '';
	$indexLinks = {};
	$indexTags = '';
	$pageTitle = 'Knowledge Index at Fractal Maṇḍala';
	$pageDescription = 'The digital garden as a WIP and in indexed form...';
	$pageUrl = 'https://www.fractalmandala.in/know';
	$shareImage =
		'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp';
</script>

<div class="rta-column rowgap300">
	<div class="rta-column grot rowgap200">
		<p>
			This is the main page for my digital garden. The sidebar on the left (top on mobile) lists all
			entries in it in alphabetical order. In time, I anticipate folders and sub-folders to emerge.
			This <a href="https://wiki.nikiv.dev/" target="_blank" rel="noreferrer">digital garden</a> is my
			inspiration for building one, and at least initially I will try to follow the same template. I
			rarely use websites on mobile, and it's no different for this site as well. So development here
			will always be desktop-first, and mobile might often be broken.
		</p>
		<p>
			Each entry is accompanied by a set of related links, and appended with code snippets where
			relevant. The snippets are more for my own record. I also follow a tagging and categorisation
			system, let's call it the garden's <a href="/know/ontology">ontology.</a>
		</p>
	</div>
</div>
