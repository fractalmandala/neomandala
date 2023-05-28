export function truncateWords(text: string, wordLimit: number) {
	const words = text.split(' ');
	const truncatedWords = words.slice(0, wordLimit);
	return truncatedWords.join(' ');
}

export function setQuery(query: string, newQuery: string) {
	query = newQuery;
}
