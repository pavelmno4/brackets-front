<script lang="ts">
    import { locale } from '$lib/const';

    import { page } from '$app/stores';
    import type { Competition } from '$lib/types/competition/Competition';
    import CategoryTable from './CategoryTable.svelte';
    import image from '$lib/test/competition-image.jpg';
	import type { PageData } from './$types';

    export let data: PageData;

    $: competition = data.competition satisfies Competition;
    $: registrationUrl = $page.url + '/registration';
    $: femaleParticipantsUrl = $page.url + '/participants/FEMALE';
</script>

<section class="competition">
    <article class="card">
        <h1 class="title">{competition.title}</h1>
        <div class="image-and-description">
            <img src={image} alt="Fight of two wrestlers" />
            <div class="description">
                <p>
                    {#if competition.startDate.getUTCDate() === competition.endDate.getUTCDate()}
                        {competition.startDate.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
                    {:else if competition.startDate.getMonth() === competition.endDate.getMonth()}
                        {competition.startDate.getDate()}-{competition.endDate.getDate()} {competition.endDate.toLocaleString(locale, { month: "short" })} {competition.endDate.getFullYear()} г.
                    {:else}
                        {competition.startDate.getDate()} {competition.startDate.toLocaleString(locale, { month: "short" })} - {competition.endDate.getDate()} {competition.endDate.toLocaleString(locale, { month: "short" })} {competition.endDate.getFullYear()} г.
                    {/if}
                </p>
                <p>{competition.address}</p>
                <a href={registrationUrl} class="registration-link">Регистрация участника</a>
            </div>
        </div>
        <h4 class="participants-list-title">Списки участников</h4>
        <h6 class="male-participants">Юноши</h6>
        <CategoryTable categories={competition.categories} />
        <h6 class="female-participants">Девушки</h6>
        <a href="{femaleParticipantsUrl}">Смотреть список участниц</a>
    </article>
</section>

<style>
    .card {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .title {
        align-self: center;
        text-align: center;
    }

    .image-and-description {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    img {
        height: 30vh;
        border: 1px solid black;
        border-radius: 6px;
    }

    .description {
        margin: 3vh;
    }

    .registration-link {
        color: black;
        background-color: var(--pico-color-azure-100);
        border: 1px solid gray;
        border-radius: 6px;
        width: 100%;
        padding: 14px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    .registration-link:hover {
        background-color: var(--pico-color-azure-150);
    }

    .participants-list-title {
        margin-top: 2vh;
        font-weight: 500;
        text-decoration: underline;
    }

    .male-participants {
        font-weight: 500;
    }

    .female-participants {
        font-weight: 500;
    }

    @media all and (max-width: 1024px) {
        .card {
            align-items: center;
        }
    }
</style>