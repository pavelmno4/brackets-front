<script lang="ts">
	import { locale } from '$lib/const';
	import { page } from '$app/stores';
	import type { Competition } from '$lib/types/competition/Competition';
	import { Stage } from '$src/lib/types/competition/Stage';
	import type { PageData, SubmitFunction } from './$types';
	import { goto } from '$app/navigation';
	import { Role } from '$src/lib/types/user/Role';
	import Modal from '$src/lib/Modal.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let showStartModal: boolean;

	$: competition = data.competition satisfies Competition;
	$: registrationUrl = $page.url + '/registration';
	$: participantsUrl = $page.url + '/participants';
	$: userIsEditor = data.user ? data.user.roles.includes(Role.EDITOR) : false;

	$: closedToUse =
		competition.stage === Stage.COMPLETED || (competition.stage === Stage.RUNNING && !userIsEditor);

	const startCompetition: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update();
		};
	};
</script>

<section class="competition">
	<article class="card">
		<h1 class="title">{competition.title}</h1>
		<div class="image-and-description">
			<img src={competition.imagePath} alt="Fight of two wrestlers" />
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
				<button type="submit" on:click={() => goto(registrationUrl)} disabled={closedToUse}>
					Регистрация участника
				</button>
				{#if userIsEditor}
					<button
						class="button-confirm"
						disabled={closedToUse}
						on:click={() => (showStartModal = true)}
					>
						Начать турнир
					</button>
				{/if}
			</div>
		</div>
		<a href={participantsUrl}><h4 class="participants-list-title">Списки участников</h4></a>
	</article>
</section>

<Modal bind:showModal={showStartModal} let:closeModal>
	<article class="modal">
		<form method="POST" use:enhance={startCompetition}>
			<header class="modal-header">
				<h4>
					Все участники, не прошедшие взвешивание, будут удалены. Текущие турнирные сетки будут
					очищены. Продолжить?
				</h4>
			</header>
			<footer class="modal-footer">
				<button class="button-confirm" formaction="?/startCompetition" on:click={closeModal}>
					Продолжить
				</button>
				<button class="button-cancel" formaction="?/close" on:click={closeModal}>Отмена</button>
			</footer>
		</form>
	</article>
</Modal>

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
		height: 31vh;
		border: 1px solid black;
		border-radius: 6px;
	}

	.description {
		margin: 3vh;
	}

	.participants-list-title {
		margin-top: 2vh;
		font-weight: 500;
		text-decoration: underline;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	.button-cancel {
		background-color: var(--pico-color-red-550);
		border: 1px solid var(--pico-color-red-550);
	}

	.button-cancel:hover {
		background-color: var(--pico-color-red-650);
		border: 1px solid var(--pico-color-red-650);
	}

	.button-confirm {
		background-color: var(--pico-color-jade-500);
		border: 1px solid var(--pico-color-jade-500);
	}

	.button-confirm:hover {
		background-color: var(--pico-color-jade-600);
		border: 1px solid var(--pico-color-jade-600);
	}

	@media all and (max-width: 1024px) {
		.card {
			align-items: center;
		}
	}
</style>
