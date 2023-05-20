import { onMount } from "svelte";

export let div: HTMLElement;

const copyToClipboard = (text:any) => {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  navigator.clipboard.write(data).then(() => {
    console.log("Copied to clipboard!");
  }, () => {
    console.log("Failed to copy to clipboard.");
  });
};

onMount(() => {
  div.addEventListener("click", () => {
    copyToClipboard(div.textContent);
  });
});
