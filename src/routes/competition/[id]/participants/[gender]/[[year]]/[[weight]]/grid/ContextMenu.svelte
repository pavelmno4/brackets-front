<script lang="ts">
	import { useNodes, useEdges } from '@xyflow/svelte';

	export let onClick: () => void;
	export let id: string;
	export let top: number | undefined;
	export let left: number | undefined;

	const nodes = useNodes();
	const edges = useEdges();

	$: edgesToChildren = $edges.filter((edge) => edge.target === id).map((edge) => edge.source);
	$: childNodes = $nodes
		.filter((node) => edgesToChildren.includes(node.id))
		.filter((node) => !!(node.data.label as string).trim());
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div style="top: {top}px; left: {left}px;" class="context-menu" on:click={onClick}>
	<p style="margin: 0.5em;">
		<small>Победу одержал</small>
	</p>
	{#each childNodes as node}
		<div on:click={() => alert(`Победитель: ${node.data.label}!`)}>{node.data.label}</div>
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

	.context-menu div {
		border: none;
		display: block;
		padding: 0.5em;
		text-align: left;
		width: 100%;
	}

	.context-menu div:hover {
		background: var(--pico-color-azure-50);
	}
</style>
