<script lang="ts">
    import type { PageData } from './$types';
    import type { Competition } from '$lib/types/competition/Competition';
    import CompetitionCard from '$lib/CompetitionCard.svelte';

    export let data: PageData;

    $: upcomingCompetitions = data.competitions satisfies Array<Competition>;
</script>

<section class="upcoming">
    {#each upcomingCompetitions as competition (competition.id)}
        <CompetitionCard {...competition} />
    {:else}
        <h3 class="message-empty">Турниры не найдены</h3>
    {/each}
</section>

<style>
    .upcoming {
        flex-direction: column;
    }

    .message-empty {
        text-align: center;
    }
</style>