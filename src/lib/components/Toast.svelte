<script lang="ts">
  import { toastStore, hideToast } from '$lib/stores/modalstores';

  let alertContent:any = null;

  function handleCloseClick() {
    hideToast();
  }

  toastStore.subscribe(() => {
    alertContent = alert;
  });
</script>

{#if alertContent}
<div class="alert">
  <h2>{alertContent.title}</h2>
  <svelte:component this={alertContent.component} {...alertContent.props} />
  <button on:click={handleCloseClick}>Close</button>
</div>
{/if}
