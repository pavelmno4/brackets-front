<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import type { Participant } from '$lib/types/competition/Participant';
	import { Role } from '$lib/types/user/Role';
	import type { User } from '$lib/types/user/User';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import EditParticipant from './EditParticipant.svelte';

	export let user: User;
	export let genderRus: string;
	export let categories: Map<string, Array<string>>;
	export let participants: Array<Participant>;

	let showEditModal: boolean;
	let editedParticipant: Participant | undefined;

	let showDeleteModal: boolean;
	let deletedParticipant: Participant | undefined;
	const deleteParticipant: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/close') cancel();

		return async ({ update }) => {
			await update();
		};
	};

	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;

	// Input for filtering
	let searchInput = '';
	$: filteredPartitipants = searchInput
		? participants.filter(
				(participant) =>
					participant.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
					participant.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
					participant.middleName.toLowerCase().includes(searchInput.toLowerCase())
			)
		: participants;
</script>

<h5>{genderRus}</h5>
{#if userIsEditor}
	<label class="search-label" for="text">Поиск</label>
	<input type="text" id="search-fio" name="search-fio" maxlength="255" bind:value={searchInput} />
{/if}
<table>
	<tbody>
		{#each filteredPartitipants as participant, i}
			<tr>
				<th scope="row">{++i}</th>
				<td>{`${participant.lastName} ${participant.firstName} ${participant.middleName}`}</td>
				<td>
					<nobr>{participant.birthDate.getFullYear()} г.р.</nobr>
				</td>
				<td>
					<nobr>до {participant.weightCategory} кг</nobr>
				</td>
				<td>{participant.team}</td>
				{#if userIsEditor}
					<td class="editor-column">
						<div class="weight-container">{participant.weight ? participant.weight : '----'}</div>
						<button
							on:click={() => {
								editedParticipant = participant;
								showEditModal = true;
							}}
							class="edit-button"
						></button>
						<button
							on:click={() => {
								deletedParticipant = participant;
								showDeleteModal = true;
							}}
							class="delete-button"
						>
						</button>
					</td>
				{/if}
			</tr>
		{:else}
			<h5 class="message-empty">Участники отсутствуют</h5>
		{/each}
	</tbody>
</table>

<!-- Edit modal -->
<Modal bind:showModal={showEditModal} let:closeModal>
	<EditParticipant
		id={editedParticipant?.id}
		firstName={editedParticipant?.firstName}
		lastName={editedParticipant?.lastName}
		middleName={editedParticipant?.middleName}
		team={editedParticipant?.team}
		ageCategory={editedParticipant?.ageCategory}
		weightCategory={editedParticipant?.weightCategory}
		weight={editedParticipant?.weight}
		{categories}
		{closeModal}
	/>
</Modal>

<!-- Delete modal -->
<Modal bind:showModal={showDeleteModal} let:closeModal>
	<article class="modal">
		<form method="POST" use:enhance={deleteParticipant}>
			<header class="modal-header">
				<h4>Удалить участника?</h4>
			</header>
			<footer class="modal-footer">
				<input type="hidden" name="id-for-delete" value={deletedParticipant?.id} />
				<button class="button-confirm" formaction="?/deleteParticipant" on:click={closeModal}>
					Продолжить
				</button>
				<button class="button-cancel" formaction="?/close" on:click={closeModal}>Отмена</button>
			</footer>
		</form>
	</article>
</Modal>

<style>
	.search-label {
		font-weight: bold;
	}

	table {
		overflow: auto;
	}

	.message-empty {
		text-align: center;
	}

	.editor-column {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.edit-button {
		background-color: transparent;
		background-image: url(/edit.svg);
		background-size: 27px;
		background-repeat: no-repeat;
		background-position: center;
		border: 2px solid black;
	}

	.edit-button:hover {
		background-color: var(--pico-color-zinc-50);
		border: 2px solid black;
	}

	.delete-button {
		background-color: var(--pico-color-red-550);
		background-image: url(/delete.svg);
		background-size: 27px;
		background-repeat: no-repeat;
		background-position: center;
		border: 2px solid black;
	}

	.delete-button:hover {
		background-color: var(--pico-color-red-650);
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
