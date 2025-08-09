<script lang="ts">
	import { page } from '$app/stores';
	import { maxBy } from '$lib/util/ArrayFunction';
	import type { Gender } from '$src/lib/types/competition/Gender';
	import type { Category } from '$lib/types/competition/Category';

	export let gender: Gender;
	export let categories: Array<Category>;
	let maxWeightCategoriesCount: number = maxBy(categories, (category) => category.weights.length)
		.weights.length;

	$: participantsBaseUrl = $page.url;
</script>

<div class="container">
	<table>
		<tbody>
			{#each categories as category}
				<tr>
					<th scope="row">{category.yearRange}</th>
					{#each { length: maxWeightCategoriesCount } as _, index}
						{@const weight = category.weights[index]}
						<td>
							{#if weight !== undefined}
								<a href="{participantsBaseUrl}/{gender}/{category.yearRange}/{weight}">{weight}</a>
							{:else}
								<div>-</div>
							{/if}
						</td>
					{/each}
				</tr>
			{:else}
				<h2>Данные отсутствуют</h2>
			{/each}
		</tbody>
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
