<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from './$types';
    import { Gender } from '$lib/types/competition/Gender';
    import type { Participant } from '$lib/types/competition/Participant';
	
	export let data: PageData;

    $: participants = data.participants satisfies Array<Participant>;
    $: genderRus = $page.params.gender === Gender.MALE ? 'Юноши' : 'Девушки';
    $: yearRange = $page.params.year;
    $: weightCategory = $page.params.weight;
</script>

<section class="category-simple">
    <article class="card">
        <h5>{genderRus} | <nobr>Возрастная группа: {yearRange} г.р. |</nobr> <nobr>Весовая категория: {weightCategory} кг</nobr></h5>
        <table>
            <tbody>
                {#each participants as participant, i}
                    <tr>
                        <th scope="row">{++i}</th>
                        <td>{participant.fullName}</td>
                        <td>{participant.team}</td>
                    </tr>
                {:else}
                    <h5>Участники отсутствуют</h5>
                {/each}
            </tbody>
        </table>
    </article>
</section>

<style>
    .card {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    table {
        overflow: auto;
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