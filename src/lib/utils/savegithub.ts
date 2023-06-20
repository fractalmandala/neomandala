import { VITE_GITHUB_TOKEN } from '$env/static/private';
import { showNote } from '$lib/dash/alerts' 

export async function getFileSHA(owner: string, repo: string, path: string): Promise<string | null> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `token ${VITE_GITHUB_TOKEN}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.sha;
  } else if (response.status === 404) {
    // File doesn't exist, return null
    return null;
  } else {
    throw new Error(`Failed to get the SHA of the file. Status: ${response.status}`);
  }
}

export async function createOrUpdateFile(path: string, content: string) {
	const owner = 'fractalmandala'
	const repo = 'neoman'
	const prepath = 'src/routes/janapada/'
	const message = 'file save'
  const fileSHA = await getFileSHA(owner, repo, path);
  const payload: { 
    message: string; 
    content: string; 
    committer: { name: string; email: string; }; 
    author: { name: string; email: string; };
    sha?: string;
  } = {
    message,
    content: Buffer.from(content).toString('base64'),
    committer: {
      name: 'fractalmandala',
      email: 'i.amrit.p@gmail.com'
    },
    author: {
      name: 'fractalmandala',
      email: 'i.amrit.p@gmail.com'
    }
  };

  if (fileSHA) {
    payload.sha = fileSHA;
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${prepath}/${path}.md`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${VITE_GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Failed to create or update file. Status: ${response.status}`),
		showNote('error',false)
  }
}
