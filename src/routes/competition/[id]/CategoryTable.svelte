<script lang="ts">
	import { page } from '$app/stores';
	import type { Category } from '$lib/types/competition/Category';
	import { maxBy } from '$lib/util/ArrayFunction';

	export let categories: Array<Category>;
	let maxWeightCategoriesCount: number = maxBy(categories, (category) => category.weights.length)
		.weights.length;

	$: maleParticipantsBaseUrl = $page.url + '/participants/MALE';
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
								<a href="{maleParticipantsBaseUrl}/{category.yearRange}/{weight}">{weight}</a>
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
