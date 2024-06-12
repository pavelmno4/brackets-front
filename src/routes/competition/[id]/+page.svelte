<script lang="ts">
    import { locale } from '$lib/const';

    import type { Competition } from '$lib/types/competition/Competition';
    import image from '$lib/test/competition-image.jpg';
    import CategoryTable from './CategoryTable.svelte';

    export let data: Competition;
</script>

<div class="container">
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
                <button class="light-blue-buttton">Зарегистрироваться</button>
            </div>
        </div>
        <h4 class="participants-list-title">Списки участников</h4>
        <CategoryTable categories={data.categories} />
    </article>
</div>

<style>
    .card {
        padding-left: 10vh;
        padding-right: 10vh;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .title {
        align-self: center;
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

    .light-blue-buttton {
        color: black;
        background-color: var(--pico-color-azure-100);
        border: 1px solid black;
        width: 100%;
    }

    .light-blue-buttton:hover {
        background-color: var(--pico-color-azure-150);
    }

    .participants-list-title {
        margin-top: 2vh;
        font-weight: 500;
        text-decoration: underline;
    }

    @media all and (max-width: 500px) {
        .card {
            padding-left: 0;
            padding-right: 0;
            align-items: center;
        }
    }
</style>