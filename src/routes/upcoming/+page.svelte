<script lang="ts">
    import type { PageData } from './$types';
    import type { Competition } from '$lib/types/competition/Competition';
    import CompetitionCard from '$lib/CompetitionCard.svelte';

    export let data: PageData;
    $: upcomingCompetitions = data.competitions satisfies Competition;
</script>

<div class="container">
    {#each upcomingCompetitions as competition (competition.id)}
        <CompetitionCard {...competition} />
    {:else}
        <h1>No results</h1>
    {/each}
</div>

<style>
    .container {
        flex-direction: column;
    }
</style>