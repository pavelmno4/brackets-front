<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { Viewer } from '$lib/types/competition/Viewer';

	export let data: PageData;

	$: viewers = data.viewers satisfies Array<Viewer>;

	$: competitionUrl = $page.url.toString().replace('/viewer', '');

	// Input for filtering
	let searchInput = '';
	$: filteredViewers = searchInput
		? viewers.filter(
				(viewer: Viewer) =>
					viewer.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
					viewer.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
					viewer.middleName.toLowerCase().includes(searchInput.toLowerCase())
			)
		: viewers;
</script>

<nav>
	<ul>
		<li><a href={competitionUrl}>&larr; на страницу турнира</a></li>
	</ul>
</nav>
<section class="category-simple">
	<article class="card">
		<h5>Зрители</h5>
		<label class="search-label" for="text">Поиск</label>
		<input type="text" id="search-fio" name="search-fio" maxlength="255" bind:value={searchInput} />

		<table>
			<tbody>
				{#each filteredViewers as viewer, i}
					<tr>
						<th scope="row">{++i}</th>
						<td>{viewer.lastName}</td>
						<td>{viewer.firstName}</td>
						<td>{viewer.middleName}</td>
						<td>{viewer.phone}</td>
					</tr>
				{:else}
					<h5 class="message-empty">Зрители отсутствуют</h5>
				{/each}
			</tbody>
		</table>
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
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
