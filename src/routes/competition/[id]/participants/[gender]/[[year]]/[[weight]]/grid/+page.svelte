<script lang="ts">
	import type { Participant } from '$src/lib/types/competition/Participant';
	import CategoryHeader from '$src/lib/CategoryHeader.svelte';
	import { type Grid } from '$src/lib/types/competition/Grid';
	import { Gender } from '$src/lib/types/competition/Gender';
	import { Role } from '$src/lib/types/user/Role';
	import Dendrogram from './Dendrogram.svelte';
	import Modal from '$src/lib/Modal.svelte';
	import Pedestal from './Pedestal.svelte';
	import type { PageData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data: PageData;

	$: grid = data.grid as Grid | null;
	$: isMobileDevice = data.isMobile as boolean;
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
	$: participants = data.participants;
	$: user = data.user;

	$: participantsUrl = $page.url.toString().replace('/grid', '');
	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;

	let participantsMap: Map<string, Participant> = data.participants.reduce(
		(accumulator: Map<string, Participant>, participant: Participant) => (
			accumulator.set(participant.id, participant), accumulator
		),
		new Map<string, Participant>()
	);

	$: firstPlaceParticipant = grid ? participantsMap.get(grid.firstPlaceParticipantId) : undefined;
	$: secondPlaceParticipant = grid ? participantsMap.get(grid.secondPlaceParticipantId) : undefined;
	$: thirdPlaceParticipant = grid ? participantsMap.get(grid.thirdPlaceParticipantId) : undefined;

	let showGenerateModal: boolean = false;

	const generateGrid: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update();
		};
	};
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
				{#key grid}
					<Dendrogram {grid} {participants} {user} {isMobileDevice}/>

					{#if userIsEditor}
						<Pedestal
							{participants}
							gridId={grid.id}
							firstPlace={grid.firstPlaceParticipantId}
							secondPlace={grid.secondPlaceParticipantId}
							thirdPlace={grid.thirdPlaceParticipantId}
						/>
						<div class="regenerate-button-container">
							<button class="regenerate-button" on:click={() => (showGenerateModal = true)}>
								Перегенерировать &#8634;
							</button>
						</div>
					{:else}
						<hr />
						<div class="pedestal-view">
							{#if grid.firstPlaceParticipantId}
								<div>
									<h6>I место</h6>
									<p>
										{`${firstPlaceParticipant?.lastName} ${firstPlaceParticipant?.firstName} ${firstPlaceParticipant?.middleName}`}
										({firstPlaceParticipant?.team})
									</p>
								</div>
							{/if}
							{#if grid.secondPlaceParticipantId}
								<div>
									<h6>II место</h6>
									<p>
										{`${secondPlaceParticipant?.lastName} ${secondPlaceParticipant?.firstName} ${secondPlaceParticipant?.middleName}`}
										({secondPlaceParticipant?.team})
									</p>
								</div>
							{/if}
							{#if grid.thirdPlaceParticipantId}
								<div>
									<h6>III место</h6>
									<p>
										{`${thirdPlaceParticipant?.lastName} ${thirdPlaceParticipant?.firstName} ${thirdPlaceParticipant?.middleName}`}
										({thirdPlaceParticipant?.team})
									</p>
								</div>
							{/if}
						</div>
					{/if}
				{/key}
			{/key}
		{:else}
			<h5 class="message-empty">Турнирная сетка отсутствует</h5>
			{#if userIsEditor}
				<button on:click={() => (showGenerateModal = true)}>Сгенерировать</button>
			{/if}
		{/if}
	</article>
</section>

<Modal bind:showModal={showGenerateModal} let:closeModal>
	<article class="modal">
		<form method="POST" use:enhance={generateGrid}>
			<header class="modal-header">
				<h4>Текущая турнирная сетка для данной категории будет очищена. Продолжить?</h4>
			</header>
			<footer class="modal-footer">
				<input type="hidden" name="gender" value={$page.params.gender} />
				<input type="hidden" name="yearRange" value={yearRange} />
				<input type="hidden" name="weightCategory" value={weightCategory} />
				<button class="button-confirm" formaction="?/generateGrid" on:click={closeModal}>
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
		align-items: center;
	}

	.pedestal-view {
		align-self: flex-start;
	}

	.message-empty {
		text-align: center;
	}

	.regenerate-button-container {
		display: flex;
		width: 100%;
		justify-content: flex-end;
	}

	.regenerate-button {
		background-color: var(--pico-color-red-550);
		border: 1px solid var(--pico-color-red-550);
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
</style>
