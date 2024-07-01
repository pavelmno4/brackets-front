<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from './$types';
    import { Gender } from '$lib/types/competition/Gender';
    import type { Participant } from '$lib/types/competition/Participant';
    import ParticipantsTable from './ParticipantsTable.svelte';
    import HeterogeneousParticipantsTable from './HeterogeneousParticipantsTable.svelte';

    export let data: PageData;

    $: participants = data.participants satisfies Array<Participant>;
    $: genderRus = $page.params.gender === Gender.MALE ? 'Юноши' : 'Девушки';
    $: yearRange = $page.params.year;
    $: weightCategory = $page.params.weight;
</script>

<section class="category-simple">
    <article class="card">
        {#if yearRange !== undefined && weightCategory !== undefined }
            <ParticipantsTable
                genderRus={genderRus}
                yearRange={yearRange}
                weightCategory={weightCategory}
                participants={participants}
            />
        {:else}
            <HeterogeneousParticipantsTable
                genderRus={genderRus}
                participants={participants}
            />
        {/if}
    </article>
</section>

<style>
    .card {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }
</style>