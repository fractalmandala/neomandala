// src/routes/api/save.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { VITE_GITHUB_TOKEN } from '$env/static/private';


export const POST: RequestHandler = async ({ request }) => {
    const { filename, content, message } = await request.json();
    const url = `https://api.github.com/repos/username/repo/contents/${filename}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${VITE_GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                content: Buffer.from(content, 'utf-8').toString('base64')
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        return new Response(await response.text(), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return json({ error: 'There was an error processing your request' }, { status: 500 });
    }
};
