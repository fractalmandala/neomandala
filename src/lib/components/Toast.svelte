<script lang="ts">
  import { uiStore } from '$lib/stores/modalstores';

  let toastContent:any = null;

  uiStore.subscribe(({ toast }) => {
    toastContent = toast;
  });
</script>

{#if toastContent}
<div class="toast">
  <svelte:component this={toastContent.component} {...toastContent.props} />
  <button on:click={() => uiStore.close()}>Close</button>
</div>
{/if}
