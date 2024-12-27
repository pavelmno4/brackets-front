<script lang="ts">
	import type { Participant } from '$src/lib/types/competition/Participant';
	import { type Grid } from '$src/lib/types/competition/Grid';
	import type { User } from '$src/lib/types/user/User';
	import { Role } from '$src/lib/types/user/Role';
	import SelectWinnerContextMenu from './SelectWinnerContextMenu.svelte';
	import SwapNodesContextMenu from './SwapNodesContextMenu.svelte';
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
	export let participants: Array<Participant>;
	export let user: User | undefined;
	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;

	const participantsMap = participants.reduce(
		(accumulator, participant) => (accumulator.set(participant.id, participant), accumulator),
		new Map<string, Participant>()
	);

	const nodeWidth = 172;
	const nodeHeight = 58;

	const layoutedNodesWithBaseStyle: Array<Node> = grid.nodes.map((node) => {
		const fullName: string = node.data
			? participantsMap.get(node.data.participantId)
				? participantsMap.get(node.data.participantId)!.fullName
				: ''
			: '';
		const team: string = node.data
			? participantsMap.get(node.data.participantId)
				? `(${participantsMap.get(node.data.participantId)!.team.replace(' ', '\xa0')})`
				: ''
			: '';

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

	// Select winner menu
	let selectWinnerContextMenu: { id: string; top?: number; left?: number } | null;

	// Swap context menu
	let swapNodesContextMenu: {
		firstNodeId: string;
		secondNodeId: string;
		top?: number;
		left?: number;
	} | null;
	$: selectedNodes = $nodes.filter((node) => node.selected);

	function handleContextMenu({ detail: { event, node } }) {
		event.preventDefault();

		if (userIsEditor && selectedNodes.length === 2) {
			swapNodesContextMenu = {
				firstNodeId: selectedNodes[0].id,
				secondNodeId: selectedNodes[1].id,
				top: event.clientY,
				left: event.clientX
			};
		} else if (userIsEditor) {
			selectWinnerContextMenu = {
				id: node.id,
				top: event.clientY,
				left: event.clientX
			};
		}
	}

	function handlePaneClick() {
		selectWinnerContextMenu = null;
		swapNodesContextMenu = null;
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
		zoomOnDoubleClick={false}
		on:paneclick={handlePaneClick}
		on:nodecontextmenu={handleContextMenu}
		connectionLineType={ConnectionLineType.Step}
		defaultEdgeOptions={{ type: 'step', animated: false }}
		colorMode="system"
	>
		<Background />
		{#if selectWinnerContextMenu}
			<SelectWinnerContextMenu
				gridId={grid.id}
				nodeId={selectWinnerContextMenu.id}
				left={selectWinnerContextMenu.left}
				top={selectWinnerContextMenu.top}
			/>
		{/if}
		{#if swapNodesContextMenu}
			<SwapNodesContextMenu
				gridId={grid.id}
				firstNodeId={swapNodesContextMenu.firstNodeId}
				secondNodeId={swapNodesContextMenu.secondNodeId}
				top={swapNodesContextMenu.top}
				left={swapNodesContextMenu.left}
			/>
		{/if}
		<Controls showZoom={false} showLock={false} />
	</SvelteFlow>
</div>

<style>
	.dendrogram-container {
		display: block;
		width: 100%;
		height: 65vh;
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
