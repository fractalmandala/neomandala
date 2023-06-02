export async function load({ params }: { params: { post: string } }){
	const post = await import(`/Users/amrit/versioner/neoman/src/routes/(protected)/web/${params.post}.md`)
	const { title, tags, featured, type, id } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
		featured,
		type,
		id
	}
}