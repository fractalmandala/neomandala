---
title: tiptap
itemimage: 
links:
- { url: 'https://tiptap.dev/', name: 'Tiptap'}
- { url: 'https://tiptap.dev/installation/svelte', name: 'Tiptap for Sveltekit'}
tags: product development
synapse: kṛt
---

I recently became obsessed with building a WYSIWYG editor on my website front-end. Strictly speaking, there was absolutely no need for this, for there is no reason to insist on writing on a website front-end. From Google Docs and Notion for simple docs, to VS Code, Zed and LogSeq for markdown, options abound. 

So why build one of my own, on a Sveltekit front page? Well, it's like what mountaineer George Mallory replied, when asked why he wanted to climb Mt. Everest- "*because it's there."*

Now a WYSIWYG editor is no Everest, but damn has it been tough to find a working solution that satisfies all my requirements. Primarily, I wanted a rich-text editor, the text content of which could be passed to a variable that is submitted to Supabase.  This way I could use Supabase as my notes db, or even for full-fledged posts. 

I tried Quill, Lexical, TinyMCE and a few more I can't remember the names of. Whether because they simply don't fit what I needed, or because I'm still a rookie on the basics of DOM hydration, Sveltekit onMount etc., none of these solutions worked to satisfaction. I should add- I also needed a solution that would work for code snippet inputs, and was markdown friendly.

#### Enter Tiptap.

Ah, what a lovely tool. It works right out of the box, if one just copies their sample Sveltekit template. But to add, it has a wonderful array of functionalities, extensions and utilities that help customize it in several ways. Simply put, I love it. It has solved my problem, and I'm now a fan. 