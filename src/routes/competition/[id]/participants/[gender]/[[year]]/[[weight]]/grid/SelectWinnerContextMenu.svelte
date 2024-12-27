<script lang="ts">
	import { useNodes, useEdges } from '@xyflow/svelte';

	export let gridId: string;
	export let nodeId: string;
	export let top: number | undefined;
	export let left: number | undefined;

	const nodes = useNodes();
	const edges = useEdges();

	$: edgesToChildren = $edges.filter((edge) => edge.target === nodeId).map((edge) => edge.source);
	$: childNodes = $nodes
		.filter((node) => edgesToChildren.includes(node.id))
		.filter((node) => !!(node.data.label as string).trim());
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div style="top: {top}px; left: {left}px;" class="context-menu">
	<p style="margin: 0.5em;">Победу одержал</p>
	{#each childNodes as node}
		<form method="POST" action="?/selectWinner">
			<input type="hidden" name="gridId" value={gridId} />
			<input type="hidden" name="nodeId" value={nodeId} />
			<input type="hidden" name="winnerNodeId" value={node.id} />
			<button type="submit"><small>{node.data.label}</small></button>
		</form>
	{/each}
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
