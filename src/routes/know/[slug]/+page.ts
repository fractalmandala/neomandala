export async function load({ params }: { params: { slug: string } }){
	const post = await import(`../${params.slug}.md`)
	const { title, image, links, tags, synapse } = post.metadata
	const content = post.default
	return {
		content,
		title,
		image,
		links,
		tags,
		synapse
	}
}