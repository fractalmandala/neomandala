import { textGeneration } from "@huggingface/inference";
import { defaultModel } from '$lib/neo/models'
import { modelEndpoint } from '$lib/neo/endpoints'
import { trimSuffix, trimPrefix } from '$lib/neo/utils'

const PUBLIC_SEP_TOKEN = "</s>";

const params = {
      "temperature": 0.9,
      "top_p": 0.95,
      "repetition_penalty": 1.2,
      "top_k": 50,
      "truncate": 1000,
      "max_new_tokens": 1024
    }

interface Parameters {
	temperature: number;
	truncate: number;
	max_new_tokens: number;
	stop: string[];
}
export async function generateFromDefaultEndpoint(
	prompt: string,
	parameters?: Partial<Parameters>
) {
	const newParameters = {
		...params,
		...parameters,
		return_full_text: false,
	};

	const endpoint = modelEndpoint(defaultModel);
	let { generated_text } = await textGeneration(
		{
			model: endpoint.url,
			inputs: prompt,
			parameters: newParameters,
		},
		{
			fetch: (url, options) =>
				fetch(url, {
					...options,
					headers: { ...options?.headers, Authorization: endpoint.authorization },
				}),
		}
	);

	generated_text = trimSuffix(trimPrefix(generated_text, "<|startoftext|>"), PUBLIC_SEP_TOKEN);

	return generated_text;
}
