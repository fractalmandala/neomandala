import { VITE_OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const config = { runtime: 'edge' };

export const POST: RequestHandler = async ({ request }) => {
  try {
    if (!VITE_OPENAI_API_KEY) {
      throw new Error('OPENAI_KEY env variable not set');
    }

    const requestData = await request.json();
    if (!requestData) {
      throw new Error('No request data');
    }

    const content: string = requestData.content;
    if (!content) {
      throw new Error('No content provided');
    }

    const embeddingsRequestOpts = {
      model: 'text-embedding-ada-002',
      documents: [content],
    };

    const embeddingsResponse = await fetch('https://api.openai.com/v1/embeddings', {
      headers: {
        Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(embeddingsRequestOpts),
    });

    if (!embeddingsResponse.ok) {
      const err = await embeddingsResponse.json();
      throw new Error(err.error.message);
    }

    const embeddingsData = await embeddingsResponse.json();

    return json({ embeddings: embeddingsData.data[0] });
  } catch (err) {
    console.error(err);
    return json({ error: 'There was an error processing your request' }, { status: 500 });
  }
};