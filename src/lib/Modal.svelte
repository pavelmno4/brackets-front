<script lang="ts">
    export let showModal: boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();

    const closeModal = () => dialog.close();
</script>

<!-- see https://svelte.dev/examples/modal -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    autofocus
>
    <slot { closeModal } />
</dialog>

