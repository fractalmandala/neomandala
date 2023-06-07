import { VITE_GITHUB_TOKEN } from '$env/static/private';

const owner = 'fractalmandala'
const repo = 'neomandala'
const path = 'src/routes/%28protected%29/janapada/01.md'

const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  headers: {
    'Authorization': `token ${VITE_GITHUB_TOKEN}`
  }
});

const data = await response.json();
export const content = atob(data.content);  // The content is base64 encoded

