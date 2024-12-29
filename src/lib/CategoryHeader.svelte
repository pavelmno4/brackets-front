<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from './types/user/User';
	import { Role } from './types/user/Role';

	export let genderRus: string;
	export let categories: Map<string, Array<string>>;
	export let yearRange: string;
	export let weightCategory: string;
	export let urlSuffix: string;
	export let user: User;

	$: selectedWeightCategory = weightCategory;
	$: weightCategories = categories.get(yearRange);
	$: userIsEditor = user ? user.roles.includes(Role.EDITOR) : false;

	$: baseUrl = `/competition/${$page.params.id}/participants/${$page.params.gender}/${yearRange}`;
</script>

{#if userIsEditor}
	<nav>
		<ul>
			<li><strong class="header">{genderRus}</strong></li>
		</ul>
		<ul>
			<li>|</li>
		</ul>
		<ul>
			<li>
				<strong class="header">Возрастная группа: {yearRange} г.р.</strong>
			</li>
		</ul>
		<ul>
			<li>|</li>
		</ul>
		<ul>
			<li>
				<strong class="header">Весовая категория:</strong>
				<details class="dropdown">
					<summary class="selected">{selectedWeightCategory}</summary>
					<ul dir="rtl">
						{#each weightCategories ? weightCategories : [] as weightCategoryItem}
							<li><a href="{baseUrl}/{weightCategoryItem}/{urlSuffix}">{weightCategoryItem}</a></li>
						{/each}
					</ul>
				</details>
				<strong class="header">кг</strong>
			</li>
		</ul>
	</nav>
{:else}
	<h5>
		{genderRus} |
		<nobr>Возрастная группа: {yearRange} г.р. |</nobr>
		<nobr>Весовая категория: {weightCategory} кг</nobr>
	</h5>
{/if}

<style>
	.header {
		font-size: 1.125rem;
	}
</style>
