<script lang="ts">
    import type { Competition } from '$lib/types/competition/Competition';
    import CompetitionCard from '$lib/CompetitionCard.svelte';

    let upcomingCompetitions: Array<Competition> = [
        {
            title: 'Витязи Подмосковья',
            startDate: new Date(2024, 8, 25),
            endDate: new Date(2024, 8, 26),
            address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
            imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg'
        },
        {
            title: 'Честь Воина',
            startDate: new Date(2024, 10, 4),
            endDate: new Date(2024, 10, 4),
            address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
            imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg'
        },
        {
            title: 'Турнир Номер Три',
            startDate: new Date(2024, 10, 30),
            endDate: new Date(2024, 11, 2),
            address: 'Московская обл., Серпуховский р-н, п. Большевик, Спортивная, 13',
            imagePath: 'https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg'
            }
    ];
</script>

<div class="container">
    {#each upcomingCompetitions as competition, i}
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