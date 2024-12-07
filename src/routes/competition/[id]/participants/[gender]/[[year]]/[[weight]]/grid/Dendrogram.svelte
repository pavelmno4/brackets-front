<script lang="ts">
	import { type Grid } from '$src/lib/types/competition/Grid';
	import type { User } from '$src/lib/types/user/User';
	import ContextMenu from './ContextMenu.svelte';
	import { writable } from 'svelte/store';
	import dagre from '@dagrejs/dagre';
	import {
		SvelteFlow,
		Background,
		Controls,
		Position,
		ConnectionLineType,
		type Node,
		type BuiltInNode,
		type Edge
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';

	export let grid: Grid;
	export let user: User | undefined;

	const nodeWidth = 172;
	const nodeHeight = 58;

	const layoutedNodesWithBaseStyle: Array<Node> = grid.nodes.map((node) => {
		const fullName: string = node.data ? node.data.participantFullName : '';
		const team: string = node.data ? `(${node.data.team.replace(' ', '\xa0')})` : '';

		return {
			id: node.id,
			data: { label: `${fullName} ${team}` },
			style: `min-width: ${nodeWidth}px; min-height: ${nodeHeight}px;`
		} as BuiltInNode;
	});
	const layoutedEdges: Array<Edge> = grid.edges as Array<Edge>;

	const nodes = writable<Array<Node>>(layoutedNodesWithBaseStyle);
	const edges = writable<Array<Edge>>(layoutedEdges);

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

	// Context menu
	let menu: { id: string; top?: number; left?: number } | null;

	function handleContextMenu({ detail: { event, node } }) {
		event.preventDefault();

		if (user !== undefined) {
			menu = {
				id: node.id,
				top: event.clientY,
				left: event.clientX
			};
		}
	}

	function handlePaneClick() {
		menu = null;
	}
</script>

<div class="dendrogram-container">
	<SvelteFlow
		{nodes}
		{edges}
		fitView
		maxZoom={1.5}
		nodesDraggable={false}
		nodesConnectable={false}
		on:paneclick={handlePaneClick}
		on:nodecontextmenu={handleContextMenu}
		connectionLineType={ConnectionLineType.Step}
		defaultEdgeOptions={{ type: 'step', animated: false }}
		colorMode="system"
	>
		<Background />
		{#if menu}
			<ContextMenu gridId={grid.id} nodeId={menu.id} left={menu.left} top={menu.top} />
		{/if}
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
