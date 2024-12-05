<script lang="ts">
	import { type Node, type Edge } from '$src/lib/types/competition/Grid';
	import { Gender } from '$src/lib/types/competition/Gender';
	import Dendrogram from './Dendrogram.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: nodes = data.nodes as Array<Node>;
	$: edges = data.edges as Array<Edge>;
	$: genderRus = $page.params.gender === Gender.MALE ? 'Юноши' : 'Девушки';
	$: yearRange = $page.params.year;
	$: weightCategory = $page.params.weight;
	$: user = data.user;

	$: participantsUrl = $page.url.toString().replace('/grid', '');
</script>

<nav>
	<ul>
		<li><a href={participantsUrl}>&larr; список участников</a></li>
	</ul>
</nav>
<section class="grid">
	<article class="card">
		<h5>
			{genderRus} |
			<nobr>Возрастная группа: {yearRange} г.р. |</nobr>
			<nobr>Весовая категория: {weightCategory} кг</nobr>
		</h5>
		<Dendrogram layoutedNodes={nodes} layoutedEdges={edges} />
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
