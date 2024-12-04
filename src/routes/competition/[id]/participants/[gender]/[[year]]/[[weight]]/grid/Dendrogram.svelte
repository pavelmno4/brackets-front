<script lang="ts">
	import { writable } from 'svelte/store';
	import dagre from '@dagrejs/dagre';
	import {
		SvelteFlow,
		Background,
		Controls,
		Position,
		ConnectionLineType,
		type Node,
		type Edge
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';

	export let layoutedNodes: Array<Node>;
	export let layoutedEdges: Array<Edge>;

	const layoutedNodesWithBaseStyle: Array<Node> = layoutedNodes.map((node) => {
		return {
			id: node.id,
			data: node.data,
			style: 'width: 172px; height: 58px;'
		} as Node;
	});

	const nodes = writable<Array<Node>>(layoutedNodesWithBaseStyle);
	const edges = writable<Array<Edge>>(layoutedEdges);

	const nodeWidth = 172;
	const nodeHeight = 60;
	const horizontalLayout = 'LR';

	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));
	dagreGraph.setGraph({ rankdir: horizontalLayout });

	layoutedNodesWithBaseStyle.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	layoutedEdges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	layoutedNodesWithBaseStyle.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		node.targetPosition = Position.Left;
		node.sourcePosition = Position.Right;

		node.position = {
			x: nodeWithPosition.x - nodeWidth / 2,
			y: nodeWithPosition.y - nodeHeight / 2
		};
	});
</script>

<div class="dendrogram-container">
	<SvelteFlow
		{nodes}
		{edges}
		fitView
		maxZoom={1.5}
		nodesDraggable={false}
		nodesConnectable={false}
		connectionLineType={ConnectionLineType.Step}
		defaultEdgeOptions={{ type: 'step', animated: false }}
		colorMode="system"
	>
		<Background />
		<Controls showZoom={false} showLock={false} />
	</SvelteFlow>
</div>

<style>
	.dendrogram-container {
		display: block;
		width: 100%;
		height: 60vh;
	}

	.dendrogram-container :global(div[role='button']) {
		padding: 1px;
	}

	@media all and (max-width: 1024px) {
		.dendrogram-container {
			height: 50vh;
		}
	}
</style>
