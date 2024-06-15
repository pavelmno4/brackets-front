<script lang="ts">
    import { page } from '$app/stores';
    import type { Category } from '$lib/types/competition/Category';

    export let categories: Array<Category>;

    $: maleParticipantsBaseUrl = $page.url + '/participants/MALE';
</script>

<div class="container">
    <table>
        <tbody>
        {#each categories as category}
            <tr>
                <th scope="row">{category.yearRange}</th>
                {#each category.weights as weight}
                    <td><a href="{maleParticipantsBaseUrl}/{category.yearRange}/{weight}">{weight}</a></td>
                {/each}
            </tr>
        {:else}
            <h2>No results</h2>
        {/each}
        <tbody>
    </table>
</div>

<style>
    table {
        border: 1px solid lightgray;
        border-radius: 6px;
    }

    @media all and (max-width: 1024px) {
        table {
            display: block;
            overflow: scroll;
        }

        table th:first-child {
            position: sticky;
            left: 0;
            z-index: 1;
        }
    }
</style>