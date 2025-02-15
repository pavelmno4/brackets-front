<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import type { Participant } from '$lib/types/competition/Participant';
	import { Role } from '$lib/types/user/Role';
	import type { User } from '$lib/types/user/User';
	import EditParticipant from './EditParticipant.svelte';

	export let user: User;
	export let genderRus: string;
	export let categories: Map<string, Array<string>>;
	export let participants: Array<Participant>;

	let showModal: boolean;
	let editedParticipant: Participant | undefined;

	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;

	// Input for filtering
	let searchInput = '';
	$: filteredPartitipants = searchInput
		? participants.filter((participant) =>
				participant.fullName.toLowerCase().includes(searchInput.toLowerCase())
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
				<td>{participant.fullName}</td>
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
								showModal = true;
							}}
							class="edit-button"
						></button>
					</td>
				{/if}
			</tr>
		{:else}
			<h5 class="message-empty">Участники отсутствуют</h5>
		{/each}
	</tbody>
</table>

<Modal bind:showModal let:closeModal>
	<EditParticipant
		id={editedParticipant?.id}
		fullName={editedParticipant?.fullName}
		team={editedParticipant?.team}
		ageCategory={editedParticipant?.ageCategory}
		weightCategory={editedParticipant?.weightCategory}
		weight={editedParticipant?.weight}
		{categories}
		{closeModal}
	/>
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
