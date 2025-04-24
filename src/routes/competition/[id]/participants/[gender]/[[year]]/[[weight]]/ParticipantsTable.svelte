<script lang="ts">
	import type { Participant } from '$lib/types/competition/Participant';
	import CategoryHeader from '$src/lib/CategoryHeader.svelte';
	import type { User } from '$lib/types/user/User';
	import { Role } from '$lib/types/user/Role';
	import Modal from '$lib/Modal.svelte';
	import EditParticipant from './EditParticipant.svelte';

	export let user: User;
	export let genderRus: string;
	export let categories: Map<string, Array<string>>;
	export let yearRange: string;
	export let weightCategory: string;
	export let participants: Array<Participant>;

	let showModal: boolean;
	let editedParticipant: Participant | undefined;

	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;
</script>

<CategoryHeader {user} {genderRus} {categories} {yearRange} {weightCategory} urlSuffix="" />
<table>
	<tbody>
		{#each participants as participant, i}
			<tr class="row">
				<th scope="row">{++i}</th>
				<td>{`${participant.lastName} ${participant.firstName} ${participant.middleName}`}</td>
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

<style>
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
