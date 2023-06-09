import { VITE_GITHUB_TOKEN } from '$env/static/private';

export async function GET() {
  const owner = 'fractalmandala';
  const repo = 'neomandala';
  const path = 'static/files/philid.pdf';

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `token ${VITE_GITHUB_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const file = await response.json();
    const pdfUrl = file.download_url;

    return pdfUrl;
  }
}