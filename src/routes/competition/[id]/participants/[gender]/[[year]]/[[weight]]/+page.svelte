<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { Role } from '$src/lib/types/user/Role';
	import { Gender } from '$lib/types/competition/Gender';
	import type { Participant } from '$lib/types/competition/Participant';
	import type { Competition } from '$src/lib/types/competition/Competition';
	import ParticipantsTable from './ParticipantsTable.svelte';
	import HeterogeneousParticipantsTable from './HeterogeneousParticipantsTable.svelte';

	export let data: PageData;

	$: competition = data.competition satisfies Competition;
	$: participants = data.participants satisfies Array<Participant>;
	$: genderRus = $page.params.gender === Gender.MALE ? 'Юноши' : 'Девушки';
	$: categories = (
		$page.params.gender === Gender.MALE
			? data.competition.categories.male
			: data.competition.categories.female
	).reduce(
		(accumulator, category) => (accumulator.set(category.yearRange, category.weights), accumulator),
		new Map<string, Array<string>>()
	);
	$: yearRange = $page.params.year;
	$: weightCategory = $page.params.weight;
	$: user = data.user;
	
	$: userIsEditor = data.user ? data.user.roles.includes(Role.EDITOR) : false;
	$: participantsPathName = $page.url.pathname.match(/^.*\/competition\/.{36}\/participants/)?.[0];
	$: particiapntsUrl = participantsPathName
		? new URL(participantsPathName, $page.url.origin).href
		: undefined;
	$: gridUrl = $page.url.pathname + '/grid';
</script>

<nav>
	<ul>
		<li><a href={particiapntsUrl}>&larr; списки участников</a></li>
	</ul>
	{#if userIsEditor}
		<ul>
			<li><h3>{competition.title}</h3></li>
		</ul>
	{/if}
	<ul>
		{#if yearRange && weightCategory && participants.length}
			<li><a href={gridUrl}>ход поединков &rarr;</a></li>
		{/if}
	</ul>
</nav>
<section class="category-simple">
	<article class="card">
		{#if yearRange !== undefined && weightCategory !== undefined}
			<ParticipantsTable
				{user}
				{genderRus}
				{categories}
				{yearRange}
				{weightCategory}
				{participants}
			/>
		{:else}
			<HeterogeneousParticipantsTable {user} {genderRus} {categories} {participants} />
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
</style>
