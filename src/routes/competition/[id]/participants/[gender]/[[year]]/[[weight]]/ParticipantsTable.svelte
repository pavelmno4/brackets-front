<script lang="ts">
	import type { Participant } from '$lib/types/competition/Participant';
	import type { User } from '$lib/types/user/User';
	import { Role } from '$lib/types/user/Role';

	export let user: User;
	export let genderRus: string;
	export let yearRange: string;
	export let weightCategory: string;
	export let participants: Array<Participant>;

	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;
</script>

<h5>
	{genderRus} |
	<nobr>Возрастная группа: {yearRange} г.р. |</nobr>
	<nobr>Весовая категория: {weightCategory} кг</nobr>
</h5>
<table>
	<tbody>
		{#each participants as participant, i}
			<tr class="row">
				<th scope="row">{++i}</th>
				<td>{participant.fullName}</td>
				<td>{participant.team}</td>
				{#if userIsEditor}
					<td class="editor-column">
						<button class="secondary editor-button">edit</button>
					</td>
				{/if}
			</tr>
		{:else}
			<h5 class="message-empty">Участники отсутствуют</h5>
		{/each}
	</tbody>
</table>

<style>
	table {
		overflow: auto;
	}

	.message-empty {
		text-align: center;
	}

    .editor-column {
        display: flex;
        justify-content: center;
    }
    
    .editor-button {
        color: gray;
        background-color: var(--pico-color-slate-100);
    }

    .editor-button:hover {
        background-color: var(--pico-color-slate-50);
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
