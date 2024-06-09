<script lang="ts">
    import { locale } from '$lib/const';

    import type { Competition } from '$lib/types/competition/Competition';
    import image from '$lib/test/competition-image.jpg';

    export let data: Competition;
</script>

<div class="container">
    <article class="card">
        <h1>{data.title}</h1>
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
                <button>Зарегистрироваться</button>
            </div>
        </div>
    </article>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    }

    .image-and-description {
        display: flex;
        flex-direction: row;
    }

    img {
        height: 30vh;
        border: 2px solid #555;
    }

    .description {
        margin: 3vh;
    }
</style>