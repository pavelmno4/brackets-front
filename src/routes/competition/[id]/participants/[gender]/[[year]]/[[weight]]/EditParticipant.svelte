<script lang="ts">
	import { enhance } from '$app/forms';
	import { validate } from '$lib/util/PageFunction';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let id: string | undefined;
	export let fullName: string | undefined;
	export let team: string | undefined;
	export let weight: number | undefined;
	export let closeModal: () => void;

	const submit: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update({ reset: false });
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
							id="fullName"
							name="fullName"
							minlength="1"
							maxlength="255"
							aria-invalid="spelling"
							bind:value={fullName}
							on:input={(event) => validate(event, () => fullName !== '')}
							on:focusout={(event) => event.currentTarget.setAttribute('aria-invalid', 'spelling')}
						/>
					</td>
					<td>
						<input type="text" id="team" name="team" maxlength="255" value={team} disabled />
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

	input {
		margin-bottom: 0px;
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
