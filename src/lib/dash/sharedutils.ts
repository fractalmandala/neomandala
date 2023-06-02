import * as timeago from 'timeago.js';

export function formatTimeAgo(date: timeago.TDate) {
	const timeAgoString = timeago.format(date);

	if (timeAgoString.includes('seconds')) return 'just now';
	if (timeAgoString.includes('minute')) return timeAgoString.replace(' minutes ago', 'm');
	if (timeAgoString.includes('hour')) return timeAgoString.replace(' hours ago', 'h');
	if (timeAgoString.includes('day')) return timeAgoString.replace(' days ago', 'd');
	if (timeAgoString.includes('week')) return timeAgoString.replace(' weeks ago', 'w');
	if (timeAgoString.includes('month')) return timeAgoString.replace(' months ago', 'mo');
	if (timeAgoString.includes('year')) return timeAgoString.replace(' years ago', 'y');

	// Return the original string if it doesn't match any of the above conditions
	return timeAgoString;
}

export function truncateWords(text: string, wordLimit: number) {
	const words = text.split(' ');
	const truncatedWords = words.slice(0, wordLimit);
	return truncatedWords.join(' ');
}

export function setQuery(query: string, newQuery: string) {
	query = newQuery;
}
