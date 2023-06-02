// src/routes/generateText.ts
import { VITE_COHERE_API } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const config = {
	runtime: 'edge'
};

export const POST: RequestHandler = async () => {
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${VITE_COHERE_API}`
		},
		body: JSON.stringify({
			max_tokens: 20,
			return_likelihoods: 'NONE',
			truncate: 'END',
			prompt: 'Once upon a time in a magical land called'
		})
	};

	try {
		const response = await fetch('https://api.cohere.ai/v1/generate', options);
		const jsonResponse = await response.json();
		if (!response.ok) {
			throw new Error(jsonResponse.message || 'Error generating text');
		}
		return new Response(jsonResponse.choices[0].text, {
			status: 200,
			headers: { 'content-type': 'text/plain' }
		});
	} catch (err) {
		console.error(err);
		return new Response('Error generating text', { status: 500 });
	}
};
