<script lang="ts">
  import { uiStore } from '$lib/stores/modalstores';

  let alertContent:any = null;

  uiStore.subscribe(({ alert }) => {
    alertContent = alert;
  });
</script>

{#if alertContent}
<div class="alert">
  <h2>{alertContent.title}</h2>
  <svelte:component this={alertContent.component} {...alertContent.props} />
  <button on:click={() => uiStore.close()}>Close</button>
</div>
{/if}
