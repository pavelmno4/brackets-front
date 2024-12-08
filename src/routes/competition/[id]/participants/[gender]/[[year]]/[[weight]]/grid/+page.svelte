<script lang="ts">
	import CategoryHeader from '$src/lib/CategoryHeader.svelte';
	import { type Grid } from '$src/lib/types/competition/Grid';
	import { Gender } from '$src/lib/types/competition/Gender';
	import Dendrogram from './Dendrogram.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: grid = data.grid as Grid | null;
	$: genderRus = $page.params.gender === Gender.MALE ? 'Юноши' : 'Девушки';
	$: categories = data.competition.categories;
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
		<CategoryHeader {user} {genderRus} {categories} {yearRange} {weightCategory} urlSuffix="grid" />
		{#if grid}
			{#key weightCategory}
				<Dendrogram {grid} {user} />
			{/key}
		{:else}
			<h5 class="message-empty">Участники отсутствуют</h5>
		{/if}
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}

	.message-empty {
		text-align: center;
	}
</style>
