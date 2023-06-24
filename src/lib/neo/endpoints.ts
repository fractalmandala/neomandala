

const KEY = import.meta.env.HUGGINGFACE_API_KEY
const modZero = 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5'

export function sum(nums: number[]): number {
	return nums.reduce((a, b) => a + b, 0);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function modelEndpoint(model: any): {
	url: string;
	authorization: string;
	weight: number;
} {
	if (!model.endpoints) {
		return {
			url: `https://api-inference.huggingface.co/models/${modZero}`,
			authorization: `Bearer ${KEY}`,
			weight: 1,
		};
	}
	const endpoints = model.endpoints;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const totalWeight = sum(endpoints.map((e: {weight: any;}) => e.weight));

	let random = Math.random() * totalWeight;
	for (const endpoint of endpoints) {
		if (random < endpoint.weight) {
			return endpoint;
		}
		random -= endpoint.weight;
	}

	throw new Error("Invalid config, no endpoint found");
}
