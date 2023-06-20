import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream, StreamingTextResponse } from 'ai'
import { HUGGINGFACE_API_KEY } from '$env/static/private';
 
// Create a new Hugging Face Inference instance
const Hf = new HfInference(HUGGINGFACE_API_KEY)
 
// IMPORTANT! Set the runtime to edge
export const config = {
	runtime: 'edge'
};
 

export async function POST({ request }) {
  // Extract the `messages` from the body of the request
  const { prompt } = await request.json()
 
  const response = Hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-6-llama-30b',
    inputs: prompt,
    parameters: {
      max_new_tokens: 200,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false
    }
  })
 
  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response)
 
  // Respond with the stream
  return new StreamingTextResponse(stream)
}