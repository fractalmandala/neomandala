import { VITE_GITHUB_TOKEN } from '$env/static/private';

export async function load({ params }: { params: { post: string } }){
  const { post } = params;
  const owner = 'fractalmandala';
  const repo = 'neomandala';
  const path = `src/routes/thea/${post}.md`;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `token ${VITE_GITHUB_TOKEN}`
    }
  });

  if (response.ok) {
    const datum = await response.json();
    const data = Buffer.from(datum.content, 'base64').toString();
    return { content: data, name: post };
  } else {
    (response.status, response.statusText);
  }
}