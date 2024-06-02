<script lang="ts">
    import { locale } from '$lib/const';

    import image from '$lib/test/competition-image.jpg';

    export let title: string;
    export let startDate: Date;
    export let endDate: Date;
    export let address: string;
    export let imagePath: string;
</script>

<article class="card">
    <img src={image} alt="Fight of two wrestlers" />
    <div class="description">
        <h2>{title}</h2>
        <p>
            {#if startDate.getUTCDate() === endDate.getUTCDate()}
                {startDate.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
            {:else if startDate.getMonth() === endDate.getMonth()}
                {startDate.getDate()}-{endDate.getDate()} {endDate.toLocaleString(locale, { month: "short" })} {endDate.getFullYear()} г.
            {:else}
                {startDate.getDate()} {startDate.toLocaleString(locale, { month: "short" })} - {endDate.getDate()} {endDate.toLocaleString(locale, { month: "short" })} {endDate.getFullYear()} г.
            {/if}
        </p>
        <p>{address}</p>
    </div>
</article>

<style>
    .card {
        display: flex;
        flex-wrap: wrap;
    }

    img {
        height: 30vh;
        border: 2px solid #555;
    }
    
    .description {
        margin: 3vh;
    }
</style>