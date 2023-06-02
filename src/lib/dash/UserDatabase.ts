import { writable, get } from 'svelte/store'
import { browser } from '$app/environment';
import type { Writable } from 'svelte/store'

export interface DocItem {
	id: string
	type: string
	title: string
	content: string
	agent: boolean
	timestamp: string
}

//types: chat, note, code

