<script lang="ts">
	import { enhance } from '$app/forms';
	import { validate } from '$lib/util/PageFunction';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let id: string | undefined;
	export let firstName: string | undefined;
	export let lastName: string | undefined;
	export let middleName: string | undefined;
	export let team: string | undefined;
	export let ageCategory: string | undefined;
	export let weightCategory: string | undefined;
	export let weight: number | undefined;
	export let categories: Map<string, Array<string>>;
	export let closeModal: () => void;

	$: weightCategories = ageCategory ? categories.get(ageCategory) : [];
	$: selectedWeightCategory = weightCategory;

	const submit: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update({ reset: false });
			selectedWeightCategory = weightCategory;
		};
	};
</script>

<form method="POST" use:enhance={submit}>
	<header>
		<table>
			<tbody>
				<tr class="row">
					<td><input type="hidden" name="id" value={id} /></td>
					<td>
						<input
							type="text"
							id="lastName"
							name="lastName"
							minlength="1"
							maxlength="255"
							aria-invalid="spelling"
							bind:value={lastName}
							on:input={(event) => validate(event, () => lastName !== '')}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						/>
					</td>
					<td>
						<input
							type="text"
							id="firstName"
							name="firstName"
							minlength="1"
							maxlength="255"
							aria-invalid="spelling"
							bind:value={firstName}
							on:input={(event) => validate(event, () => firstName !== '')}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						/>
					</td>
					<td>
						<input
							type="text"
							id="middleName"
							name="middleName"
							minlength="1"
							maxlength="255"
							aria-invalid="spelling"
							bind:value={middleName}
							on:input={(event) => validate(event, () => middleName !== '')}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						/>
					</td>
					<td>
						<input
							type="text"
							id="team"
							name="team"
							minlength="1"
							maxlength="255"
							aria-invalid="spelling"
							bind:value={team}
							on:input={(event) => validate(event, () => team !== '')}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						/>
					</td>
					<td>
						<input
							type="text"
							id="ageCategory"
							name="ageCategory"
							aria-invalid="spelling"
							bind:value={ageCategory}
							disabled
						/>
					</td>
					<td id="weightCategoryCell">
						<select
							id="weightCategory"
							name="weightCategory"
							bind:value={selectedWeightCategory}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						>
							{#each weightCategories ? weightCategories : [] as weightCategory}
								<option value={weightCategory}>{weightCategory}</option>
							{/each}
						</select>
					</td>
					<td>
						<input
							type="text"
							id="weight"
							name="weight"
							maxlength="5"
							aria-invalid="spelling"
							bind:value={weight}
							on:input={(event) =>
								validate(event, () => weight?.toString()?.match(/^\d{2,3}\.\d$/) != null)}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
							required
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</header>
	<footer>
		<button class="button-confirm" formaction="?/patch" on:click={closeModal}>Сохранить</button>
		<button class="button-cancel" formaction="?/close" on:click={closeModal}>Отмена</button>
	</footer>
</form>

<style>
	footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	td {
		padding-left: 5px;
		padding-right: 5px;
	}

	input {
		margin-bottom: 0px;
	}

	select {
		margin-bottom: 0px;
	}

	#weightCategoryCell {
		column-width: 10vw;
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
