
export async function allWritings(){
	const allfiles = import.meta.glob('/src/routes/word/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled
}

export async function allWebdev(){
	const allfiles = import.meta.glob('/src/routes/code/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled
}

export async function allVideos(){
	const allfiles = import.meta.glob('/src/routes/video/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled
}

export async function allMusic(){
	const allfiles = import.meta.glob('/src/routes/sound/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	eachfiled.sort((a, b) => b.meta.id - a.meta.id);
	return eachfiled
}


export async function allPosts(){
    const writes = await allWritings();
    const codes = await allWebdev();
    const vids = await allVideos();
    const sounds = await allMusic();

    const entries = [
        ...writes,
        ...codes,
        ...vids,
        ...sounds
    ];

    return entries.map(post => ({
        title: post.meta.title,
        url: post.linkpath,
        type: post.meta.type,
        tag: post.meta.tags
    }))
}