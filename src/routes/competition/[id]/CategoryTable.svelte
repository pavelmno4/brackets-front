<script lang="ts">
	import { page } from '$app/stores';
	import { maxBy } from '$lib/util/ArrayFunction';
	import type { Gender } from '$src/lib/types/competition/Gender';
	import type { Category } from '$lib/types/competition/Category';
	import { Stage } from '$src/lib/types/competition/Stage';
	import type { Competition } from '$src/lib/types/competition/Competition';
	import Modal from '$src/lib/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	export let competition: Competition;
	export let gender: Gender;
	export let categories: Array<Category>;
	export let userIsEditor: boolean;
	let maxWeightCategoriesCount: number = maxBy(categories, (category) => category.weights.length)
		.weights.length;
	let showGenerateGridsModal: boolean;
	let generateGridsYearRange: string;

	$: participantsBaseUrl = $page.url;
	$: closedToUse =
		competition.stage === Stage.COMPLETED || (competition.stage === Stage.RUNNING && !userIsEditor);

	const generateGrids: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update();
		};
	};
</script>

<div class="container">
	<table>
		<tbody>
			{#each categories as category}
				<tr>
					<th scope="row">{category.yearRange}</th>

					{#if userIsEditor}
						<button
							class="button-start"
							disabled={closedToUse}
							on:click={() => {
								generateGridsYearRange = category.yearRange;
								showGenerateGridsModal = true;
							}}>-></button
						>
					{/if}
					{#each { length: maxWeightCategoriesCount } as _, index}
						{@const weight = category.weights[index]}
						<td>
							{#if weight !== undefined}
								<a href="{participantsBaseUrl}/{gender}/{category.yearRange}/{weight}">{weight}</a>
							{:else}
								<div>-</div>
							{/if}
						</td>
					{/each}
				</tr>
			{:else}
				<h2>Данные отсутствуют</h2>
			{/each}
		</tbody>
	</table>
</div>

<Modal bind:showModal={showGenerateGridsModal} let:closeModal>
	<article class="modal">
		<form method="POST" use:enhance={generateGrids}>
			<header class="modal-header">
				<h4>Текущие турнирные сетки для {generateGridsYearRange} г.р. будут очищены. Продолжить?</h4>
			</header>
			<footer class="modal-footer">
				<input type="hidden" name="gender" value={gender} />
				<input type="hidden" name="yearRange" value={generateGridsYearRange} />
				<button class="button-confirm" formaction="?/generateGrids" on:click={closeModal}>
					Продолжить
				</button>
				<button class="button-cancel" formaction="?/close" on:click={closeModal}>Отмена</button>
			</footer>
		</form>
	</article>
</Modal>

<style>
	table {
		border: 1px solid lightgray;
		border-radius: 6px;
	}

	.button-start {
		color: var(--pico-color-grey-800);
		background-color: var(--pico-color-lime-250);
		border: 1px solid black;
	}

	.button-start:hover {
		color: var(--pico-color-grey-800);
		background-color: var(--pico-color-lime-350);
		border: 1px solid black;
	}

	.button-confirm {
		background-color: var(--pico-color-jade-500);
		border: 1px solid var(--pico-color-jade-500);
	}

	.button-confirm:hover {
		background-color: var(--pico-color-jade-600);
		border: 1px solid var(--pico-color-jade-600);
	}

	.button-cancel {
		background-color: var(--pico-color-red-550);
		border: 1px solid var(--pico-color-red-550);
	}

	.button-cancel:hover {
		background-color: var(--pico-color-red-650);
		border: 1px solid var(--pico-color-red-650);
	}

	@media all and (max-width: 1024px) {
		table {
			display: block;
			overflow: scroll;
		}

		table th:first-child {
			position: sticky;
			left: 0;
			z-index: 1;
		}
	}
</style>
