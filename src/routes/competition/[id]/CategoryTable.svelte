<script lang="ts">
    import type { Category } from '$lib/types/competition/Category';

    export let categories: Array<Category>;
</script>

<div class="container">
    <table>
        {#each categories as category}
            <tr>
                <th scope="row">{category.yearRange}</th>
                {#each category.weights as weight}
                    <td>{weight}</td>
                {/each}
                <td></td>
            </tr>
        {:else}
            <h2>No results</h2>
        {/each}
    </table>
</div>

<style>
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }

    table th:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
    }
</style>