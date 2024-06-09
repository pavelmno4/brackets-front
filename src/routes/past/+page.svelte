<script lang="ts">
    import type { Competition } from '$lib/types/competition/Competition';
    import CompetitionCard from '$lib/CompetitionCard.svelte';

    let pastCompetitions: Array<Competition> = [
        {
            id: '4',
            title: 'Прошедший турнир',
            startDate: new Date(2024, 4, 25),
            endDate: new Date(2024, 4, 25),
            address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
            imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg'
        }
    ];
</script>

<div class="container">
    {#each pastCompetitions as competition (competition.id)}
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