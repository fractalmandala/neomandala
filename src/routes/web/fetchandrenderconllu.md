---
title: Parse and Render Data from Conllu Files
tags: utilities
featured: true
type: other
image: https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/grid.webp
description: How to display data from .conllu files
id: 2
---

```html
<script lang="ts">
        import { onMount } from 'svelte';

        /**
         * @type {any[]}
         */
        let tables: any[] = [];

        onMount(async () => {
                const response = await fetch(`/ramayana/0000-Kanda-1_Sarga-1-1067.conllu`);
                const data = await response.text();
                const rows = data.split('\n');

                const sentences = {};

                let tableHTML = '<table class="conllu-table">';
                tableHTML +=
                        '<tr><th>SENTENCE</th><th>FORM</th><th>LEMMA</th><th>UPOS</th><th>FEATS</th><th>MISC</th></tr>';

                let currentSentence: any = null;
                let freezeSentence = false;

                rows.forEach((row, i) => {
                        if (row.trim() === '') {
                                return;
                        }

                        const columns = row.split('\t');
                        const wordNumber = columns[0];
                        const form = columns[1];
                        const lemma = columns[2];
                        const upos = columns[3];
                        const feats = columns[5];
                        const misc = columns[9];

                        if (wordNumber.startsWith('# text')) {
                                currentSentence = row.slice(row.indexOf('\t') + 9);
                                if (!(i + 1 < rows.length && rows[i + 1].startsWith('# sent_id'))) {
                                        freezeSentence = true;
                                }
                                return;
                        }

                        if (wordNumber.startsWith('#') || form.includes('-')) {
                                return;
                        }

                        if (wordNumber === '1') {
                                const sentenceNumber = Object.keys(sentences).length + 1;
                                sentences[sentenceNumber] = currentSentence;
                        }

                        const sentenceNumber = Object.keys(sentences).length;
                        if (
                                sentences[sentenceNumber] == null ||
                                sentences[sentenceNumber] == undefined ||
                                lemma == '_'
                        ) {
                                return;
                        }

                        tableHTML += '<tr>';
                        tableHTML += `<td>${sentences[sentenceNumber]}</td>`;
                        tableHTML += `<td>${form}</td>`;
                        tableHTML += `<td>${lemma}</td>`;
                        tableHTML += `<td>${upos}</td>`;
                        tableHTML += `<td>${feats}</td>`;
                        tableHTML += `<td>${misc}</td>`;
                        tableHTML += '</tr>';
                });

                tableHTML += '</table>';

                tables = [...tables, tableHTML];
        });
</script>

<div class="c-c-c-c istop">
        {#each tables as tableHTML}
                <table>
                        {@html tableHTML}
                </table>
        {/each}
</div>

<style>
        .istop {
                margin-top: 120px;
                overflow-x: scroll;
        }
</style>
```
