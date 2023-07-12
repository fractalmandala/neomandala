<script lang="ts">
	export let content: string;

	$: wordCount = getWordCount(content);
	$: readingTime = getReadingTime(wordCount);

	/**
	 * calculates the number of words in a string excluding symbols
	 * @param s - string
	 */
	const getWordCount = (s: string) => {
		return s
			.trim()
			.split(/\W+/)
			.filter((n) => n != '').length;
	};

	/**
	 * calculates the reading time based on a 200 words/minute reading time
	 * @param wordCount
	 */
	const getReadingTime = (wordCount: number) => {
		const wordsPerMinute = 200;
		const minutes = Math.ceil(wordCount / wordsPerMinute);
		return minutes;
	};
</script>

<div class="rta-row ycenter colgap200">
	<small>
		{content.length}
		{content.length === 1 ? 'character' : 'characters'}
	</small>
	<small>
		{wordCount}
		{wordCount === 1 ? 'word' : 'words'}
	</small>
	<small>
		{readingTime}
		{readingTime === 1 ? 'minute' : 'minutes'}
	</small>
</div>

<style lang="sass">

small
	color: var(--texttwo)

</style>
