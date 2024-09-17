<script lang="ts">
    import type { PageData } from './$types';
    import type { Competition } from '$lib/types/competition/Competition';
    import CompetitionCard from '$lib/CompetitionCard.svelte';

    export let data: PageData;

    $: pastCompetitions = data.competitions satisfies Array<Competition>;
</script>

<section class="past">
    {#each pastCompetitions as competition (competition.id)}
        <CompetitionCard {...competition} />
    {:else}
        <h3 class="message-empty">Турниры не найдены</h3>
    {/each}
</section>

<style>
    .past {
        flex-direction: column;
    }

    .message-empty {
        text-align: center;
    }
</style>