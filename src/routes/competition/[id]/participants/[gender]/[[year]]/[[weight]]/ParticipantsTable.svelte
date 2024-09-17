<script lang="ts">
    import type { Participant } from '$lib/types/competition/Participant';

    export let genderRus: string;
    export let yearRange: string;
    export let weightCategory: string;
    export let participants: Array<Participant>;
</script>

<h5>{genderRus} |
    <nobr>Возрастная группа: {yearRange} г.р. |</nobr>
    <nobr>Весовая категория: {weightCategory} кг</nobr>
</h5>
<table>
    <tbody>
    {#each participants as participant, i}
        <tr>
            <th scope="row">{++i}</th>
            <td>{participant.fullName}</td>
            <td>{participant.team}</td>
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