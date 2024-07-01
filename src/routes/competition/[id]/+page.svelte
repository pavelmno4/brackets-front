<script lang="ts">
    import { locale } from '$lib/const';

    import { page } from '$app/stores';
    import type { Competition } from '$lib/types/competition/Competition';
    import CategoryTable from './CategoryTable.svelte';
    import image from '$lib/test/competition-image.jpg';

    export let data: Competition;

    $: femaleParticipantsUrl = $page.url + '/participants/FEMALE';
</script>

<section class="competition">
    <article class="card">
        <h1 class="title">{data.title}</h1>
        <div class="image-and-description">
            <img src={image} alt="Fight of two wrestlers" />
            <div class="description">
                <p>
                    {#if data.startDate.getUTCDate() === data.endDate.getUTCDate()}
                        {data.startDate.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
                    {:else if data.startDate.getMonth() === data.endDate.getMonth()}
                        {data.startDate.getDate()}-{data.endDate.getDate()} {data.endDate.toLocaleString(locale, { month: "short" })} {data.endDate.getFullYear()} г.
                    {:else}
                        {data.startDate.getDate()} {data.startDate.toLocaleString(locale, { month: "short" })} - {data.endDate.getDate()} {data.endDate.toLocaleString(locale, { month: "short" })} {data.endDate.getFullYear()} г.
                    {/if}
                </p>
                <p>{data.address}</p>
                <button class="registration-buttton">Зарегистрироваться</button>
            </div>
        </div>
        <h4 class="participants-list-title">Списки участников</h4>
        <h6 class="male-participants">Юноши</h6>
        <CategoryTable categories={data.categories} />
        <h6 class="female-participants">Девушки</h6>
        <a href="{femaleParticipantsUrl}">Смотреть списки</a>
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
        border-radius:6px;
    }

    .description {
        margin: 3vh;
    }

    .registration-buttton {
        color: black;
        background-color: var(--pico-color-azure-100);
        border: 1px solid black;
        width: 100%;
    }

    .registration-buttton:hover {
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