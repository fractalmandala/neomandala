export async function load({ params }: { params: { post: string } }){
	const post = await import(`../${params.post}.md`)
	const { title, tags, featured, type, id, image, description } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
		featured,
		type,
		id,
		image,
		description
	}
}