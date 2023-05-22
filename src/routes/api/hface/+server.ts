import { HF_ACCESS_TOKEN } from '$env/static/private'

import fetch from "node-fetch";
async function query(data:any) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/bert-base-uncased",
        {
            headers: { Authorization: `Bearer ${HF_ACCESS_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query("Can you please let us know more details about your ").then((response) => {
    console.log(JSON.stringify(response));
});