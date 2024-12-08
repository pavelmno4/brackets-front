<script lang="ts">
	import CategoryHeader from '$src/lib/CategoryHeader.svelte';
	import { type Grid } from '$src/lib/types/competition/Grid';
	import { Gender } from '$src/lib/types/competition/Gender';
	import Dendrogram from './Dendrogram.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: grid = data.grid as Grid;
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
		<CategoryHeader {genderRus} {yearRange} {weightCategory} />
		<Dendrogram {grid} {user} />
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
