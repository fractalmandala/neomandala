/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import supabase from '$lib/utils/supabase';


export async function janaPada(){
		const allfiles = import.meta.glob('/src/routes/janapada/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	return eachfiled;
}



export async function allIndex() {
	const allfiles = import.meta.glob('/src/routes/know/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	return eachfiled;
}

export async function allNotes() {
	const allfiles = import.meta.glob('/src/routes/pad/notes/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	return eachfiled;
}

export async function allThea() {
	const allfiles = import.meta.glob('/src/routes/thea/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled;
}

export async function allWebdev() {
	const allfiles = import.meta.glob('/src/routes/web/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled;
}

export async function featuredWebdev() {
	const allfiles = import.meta.glob('/src/routes/web/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled
}

export async function featuredWord() {
	const allfiles = import.meta.glob('/src/routes/word/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	const featuredPosts = eachfiled.filter((post) => post.meta.featured === true)
	return featuredPosts
}

export async function thisWebdev(id: any) {
	const allfiles = import.meta.glob('/src/routes/web/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	const filteredFiled = eachfiled.filter((post) => post.meta.id === id);
	return filteredFiled;
}

export async function allVideos() {
	const allfiles = import.meta.glob('/src/routes/video/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled;
}

export async function allMusic() {
	const allfiles = import.meta.glob('/src/routes/sound/*.md');
	const filed = Object.entries(allfiles);
	const eachfiled = await Promise.all(
		filed.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver();
			const postPath = path.slice(11, -3);
			return {
				meta: metadata,
				linkpath: postPath
			};
		})
	);
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled;
}

export async function myPosts() {
	const { data, error } = await supabase
		.from('amrit-posts')
		.select()
		.order('id', { ascending: false });
	if (error) throw new Error(error.message);
	return data.map((item) => ({
		title: item.title,
		url: `/word/${item.slug}`,
		type: item.type,
		tag: item.tags
	}));
}

export async function allPosts() {
	const codes = await allWebdev();
	const vids = await allVideos();
	const sounds = await allMusic();

	const entries = [...codes, ...vids, ...sounds];

	return entries.map((post) => ({
		title: post.meta.title,
		url: post.linkpath,
		type: post.meta.type,
		tag: post.meta.tags
	}));
}
