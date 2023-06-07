import { VITE_GITHUB_TOKEN } from '$env/static/private';

export async function GET() {
  const owner = 'fractalmandala';
  const repo = 'neomandala';
  const path = 'src/routes/%28protected%29/janapada/02.md';

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `token ${VITE_GITHUB_TOKEN}`
    }
  });

  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8'); 

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
    },
  });
}
