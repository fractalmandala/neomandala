
import { uuidStore } from '$lib/stores/globalstores'
import { v4 as uuidv4 } from 'uuid';
import * as timeago from 'timeago.js';



export function generateUUID() {
	uuidStore.set(uuidv4());
}

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