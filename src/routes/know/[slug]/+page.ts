export async function load({ params }: { params: { slug: string } }){
	const post = await import(`../${params.slug}.md`)
	const { title, itemimage, links, tags, synapse } = post.metadata
	const content = post.default
	const image = 'https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png'
	const description = 'Index entry of ' + title
	return {
		content,
		title,
		itemimage,
		links,
		tags,
		synapse,
		image,
		description
	}
}