<script lang="ts">

  import { modalStore, hideModal } from '$lib/stores/modalstores';
  import { onMount } from 'svelte';

  let isShown:any, title:string, message:string, component:any;

  const unsubscribe = modalStore.subscribe(value => {
    ({ isShown, title, message, component } = value);
  });

  onMount(() => {
    return unsubscribe;
  });

  function handleCloseClick() {
    hideModal();
  }

  function handleOverlayClick(e:any) {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  }
</script>

{#if isShown}
  <div class="modal-overlay" on:click={handleOverlayClick} on:keydown={handleOverlayClick}>
    <div class="modal">
      <h2>{title}</h2>
      <p>{message}</p>
      {#if component}
        <div class="componentslot">
          <svelte:component this={component} />
        </div>
      {/if}
      <button on:click={handleCloseClick}>Close</button>
    </div>
  </div>
{/if}

<style>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 1em;
  border-radius: 4px;
  width: 80%;
  max-width: 500px;
}


</style>