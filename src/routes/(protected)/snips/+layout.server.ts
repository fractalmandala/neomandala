export const prerender = true;

import { compute_codes } from "$lib/utils/codeblocks";

export const load = async () => {
    const codes = await compute_codes();
    return { codes };
};