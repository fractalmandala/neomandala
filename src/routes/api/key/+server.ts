import type { RequestHandler } from '@sveltejs/kit';
import { VITE_APP_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestData = await request.json()
        if (!requestData) {
            throw new Error('No request data')
        }
        const keyInput: string = requestData.inputKey

        if (keyInput !== VITE_APP_KEY) {
            return new Response(JSON.stringify({ message: 'Incorrect key!' }), {
                status: 401, // Unauthorized
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({ message: 'Success' }), {
                status: 200, // Success
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ message: 'There was an error processing your request' }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
