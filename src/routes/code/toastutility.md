---
title: Toast Utility
tags: utilities
featured: false
type: sveltekit
id: 22
---

<script>

import CodeSnippet1 from '$lib/components/CodeSnippet.svelte'
let language1 = 'javascript'
let codesnip1 = `import { writable } from "svelte/store"; const initialToast = {
  isShown: false,
  title: '',
  component: null
}

export const toastStore = writable(initialToast);

export function showToast(title:string, component = null) {
  toastStore.update(state => ({...state, isShown: true, title, component}));
}

export function hideToast() {
  toastStore.update(state => ({...state, isShown: false, title: '', component: null}));
}
`

</script>

This is to have a toast alert utility in Sveltekit. It assumes you have icons set up for 'notification' and 'close'.

1. Create a toast store, for example in 'toaststores.ts'


<CodeSnippet1 language={language1} codeSnip={codesnip1}/>


```javascript
import { writable } from "svelte/store";
const initialToast = {
  isShown: false,
  title: '',
  component: null
}

export const toastStore = writable(initialToast);

export function showToast(title:string, component = null) {
  toastStore.update(state => ({...state, isShown: true, title, component}));
}

export function hideToast() {
  toastStore.update(state => ({...state, isShown: false, title: '', component: null}));
}
```

The above sets up the toast utility with space for title text and a component (optional).Next, create component Toast.svelte. We also use in this Sveltekit's fly animation. 

If you install the wonderful <a href="https://sveltelegos.com/" target="_blank" rel="noreferrer"> SvelteLegos library</a>, you can use the click outside function to close the toast by clicking outside it. 

```javascript
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { clickOutsideAction } from '$lib/utils/clickoutside'
    import { toastStore, hideToast } from '$lib/stores/modalstores';
    import Close from '$lib/icons/Close.svelte'
    import Info from '$lib/icons/Info.svelte'

    let isShown:any, title:string, component:any

    const unsubscribe = toastStore.subscribe(value => {
        ({ isShown, title, component } = value);
    });

    function handleCloseClick() {
        hideToast();
    }

    function handleOverlayClick(e:any) {
        if (e.target === e.currentTarget) {
        hideToast();
        }
    }

    $: if ( isShown === true ) {
        setTimeout(() => {
            isShown = false
        }, 5000)
    }


  onMount(() => {
    return unsubscribe;
  });
```

in the same component, for markup:

```html
{#if isShown}
<div class="toast rta-column rowgap100 null" transition:fly={{ x: 200 }} use:clickOutsideAction on:clickOutside={handleCloseClick}>
    <div class="rta-row fullW between ytop">
        <div class="rta-row colgap100 ycenter">
            <Info dimension={dimension}/>
            <p><strong>{title}</strong></p>
        </div>
        <button class="blank-button" on:click={handleCloseClick}>
            <Close dimension={dimension}/>
        </button>
    </div>
    {#if component}
        {component}
    {/if}
</div>
{/if}
```

And styling (this is sass syntax):

```css
.toast
    position: fixed
    padding: 12px
    bottom: 32px
    right: 32px
    width: 240px
    min-height: 48px
    background: var(--opposite)
    border: 1px solid var(--background)
    border-radius: 6px
    p
        margin: 0
        padding: 0
```

Now import and insert the Toast component at bottom of your root layout file. Then, to use it on any page:

```html
<script lang="ts">
	import { showModal, showToast, showAlert } from '$lib/stores/modalstores';
</script>
<button on:click={() => showToast('Hello!')}>Show Toast</button>
```

