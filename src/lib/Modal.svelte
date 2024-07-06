<script lang="ts">
    export let showModal: boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- see https://svelte.dev/examples/modal -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    autofocus
>
    <slot />
</dialog>

