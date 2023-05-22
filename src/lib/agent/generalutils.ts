import supabase from '$lib/utils/supabase'
import { latestSession, chatsCount } from '$lib/utils/supabase';
import { uuidStore } from '$lib/stores/globalstores'
import { showChip } from '$lib/stores/modalstores'
	import { v4 as uuidv4 } from 'uuid';
	import * as timeago from 'timeago.js';


let latestuuid;


  export async function loadChatsCount(uuidtext:any) {
    const data = await chatsCount(uuidtext);
    return data
  }


  export async function loadLatestSession() {
    latestuuid = await latestSession();
  }

	async function sendToSupatwo() {
		const { error } = await supabase.from('amrit-uuids').insert({ uuid: uuidStore });
		if (error) {
			throw new Error(error.message);
		} else {
			showChip('sent');
		}
	}

	export function generateUUID() {
		uuidStore.set(uuidv4());
		sendToSupatwo();
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