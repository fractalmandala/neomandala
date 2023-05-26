export async function load({ params }: { params: { post: string } }){
	const post = await import(`../${params.post}.md`)
	const { title, id } = post.metadata
	const content = post.default
	return {
		content,
		title,
    id,
	}
}