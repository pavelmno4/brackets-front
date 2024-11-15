<script lang="ts">
	import { locale } from '$lib/const';
	import { page } from '$app/stores';
	import type { Competition } from '$lib/types/competition/Competition';
	import CategoryTable from './CategoryTable.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Role } from '$lib/types/user/Role';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;

	$: competition = data.competition satisfies Competition;
	$: registrationUrl = $page.url + '/registration';
	$: femaleParticipantsUrl = $page.url + '/participants/FEMALE';
	$: isUpcomingCompetiiton = competition.endDate < new Date();
	$: userIsEditor = data.user ? data.user.roles.includes(Role.EDITOR) : false;

	function generateGrid() {
		fetch(`/api/competition/${competition.id}/grid`, { method: 'POST' });

		redirect(301, $page.url);
	}
</script>

<section class="competition">
	<article class="card">
		<h1 class="title">{competition.title}</h1>
		<div class="image-and-description">
			<img src={competition.imagePath} alt="Competition poster" />
			<div class="description">
				<p>
					{#if competition.startDate.getUTCDate() === competition.endDate.getUTCDate()}
						{competition.startDate.toLocaleDateString(locale, {
							day: 'numeric',
							month: 'short',
							year: 'numeric'
						})}
					{:else if competition.startDate.getMonth() === competition.endDate.getMonth()}
						{competition.startDate.getDate()}-{competition.endDate.getDate()}
						{competition.endDate.toLocaleString(locale, { month: 'short' })}
						{competition.endDate.getFullYear()} г.
					{:else}
						{competition.startDate.getDate()}
						{competition.startDate.toLocaleString(locale, { month: 'short' })} -
						{competition.endDate.getDate()}
						{competition.endDate.toLocaleString(locale, { month: 'short' })}
						{competition.endDate.getFullYear()} г.
					{/if}
				</p>
				<p>{competition.address}</p>
				<button
					class="registration-button"
					on:click={() => goto(registrationUrl)}
					disabled={isUpcomingCompetiiton}
				>
					Регистрация участника
				</button>
				{#if userIsEditor}
					<button class="generate-grid-button" on:click={generateGrid}>
						Сгенерировать турнирные сетки
					</button>
					<a
						href="https://bracket-s.ru/zip/competition_grid_{competition.id}.zip"
						class="download-grid-button"
						download
					>
						Скачать турнирные сетки
					</a>
				{/if}
			</div>
		</div>
		<h4 class="participants-list-title">Списки участников</h4>
		<h6 class="male-participants">Юноши</h6>
		<CategoryTable categories={competition.categories} />
		<h6 class="female-participants">Девушки</h6>
		<a href={femaleParticipantsUrl}>Смотреть список участниц</a>
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.title {
		align-self: center;
		text-align: center;
	}

	.image-and-description {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

	img {
		height: 30vh;
		border: 1px solid black;
		border-radius: 6px;
	}

	.description {
		margin: 3vh;
	}

	.registration-button {
		color: black;
		background-color: var(--pico-color-azure-100);
		border: 1px solid gray;
		border-radius: 6px;
		width: 100%;
		padding: 14px 25px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}

	.registration-button:hover {
		background-color: var(--pico-color-azure-150);
	}

	.generate-grid-button {
		align-self: center;
		background-color: var(--pico-color-azure-500);
		border: 1px solid gray;
		border-radius: 6px;
		margin-top: 15px;
		padding: 14px 25px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}

	.generate-grid-button:hover {
		background-color: var(--pico-color-azure-600);
	}

	.download-grid-button {
		align-self: center;
		color: white;
		background-color: var(--pico-color-azure-500);
		border: 1px solid gray;
		border-radius: 6px;
		margin-top: 15px;
		padding: 14px 25px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}

	.download-grid-button:hover {
		background-color: var(--pico-color-azure-600);
	}

	.participants-list-title {
		margin-top: 2vh;
		font-weight: 500;
		text-decoration: underline;
	}

	.male-participants {
		font-weight: 500;
	}

	.female-participants {
		font-weight: 500;
	}

	@media all and (max-width: 1024px) {
		.card {
			align-items: center;
		}
	}
</style>
