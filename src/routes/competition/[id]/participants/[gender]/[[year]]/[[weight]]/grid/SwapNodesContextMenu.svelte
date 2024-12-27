<script lang="ts">
	export let gridId: string;
	export let firstNodeId: string;
	export let secondNodeId: string;
	export let top: number | undefined;
	export let left: number | undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div style="top: {top}px; left: {left}px;" class="context-menu">
	<form method="POST" action="?/swapNodes">
		<input type="hidden" name="gridId" value={gridId} />
		<input type="hidden" name="firstNodeId" value={firstNodeId} />
		<input type="hidden" name="secondNodeId" value={secondNodeId} />
		<button type="submit"><small>Поменять местами</small></button>
	</form>
</div>

<style>
	.context-menu {
		background: white;
		border-style: solid;
		border-radius: 5px;
		box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
		position: fixed;
		display: block;
		z-index: 10;
	}

	.context-menu button {
		display: block;
		margin: 0px;
		padding: 0.5em;
		border: none;
		border-radius: 0px;
		text-align: left;
		width: 100%;
		background: white;
		color: black;
	}

	.context-menu button:hover {
		background: var(--pico-color-azure-50);
	}
</style>
