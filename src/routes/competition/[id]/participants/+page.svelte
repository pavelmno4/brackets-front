<script lang="ts">
	import { page } from '$app/stores';
	import type { Competition } from '$src/lib/types/competition/Competition';
	import { Gender } from '$src/lib/types/competition/Gender';
	import type { PageData } from '../$types';
	import CategoryTable from '../CategoryTable.svelte';

	export let data: PageData;

	$: competition = data.competition satisfies Competition;
	$: maleParticipantsUrl = $page.url + '/MALE';
	$: femaleParticipantsUrl = $page.url + '/FEMALE';

	$: competitionPathName = $page.url.pathname.match(/^.*\/competition\/.{36}/)?.[0];
	$: competitionUrl = competitionPathName
		? new URL(competitionPathName, $page.url.origin).href
		: undefined;
</script>

<nav>
	<ul>
		<li><a href={competitionUrl}>&larr; на страницу турнира</a></li>
	</ul>
</nav>
<section class="participants">
	<article class="card">
		<h4 class="participants-list-title">Списки участников</h4>
		<h6 class="male-participants">Юноши</h6>
		<a href={maleParticipantsUrl}>Смотреть список всех участников</a>
		<CategoryTable gender={Gender.MALE} categories={competition.categories.male} />

		<h6 class="female-participants">Девушки</h6>
		<a href={femaleParticipantsUrl}>Смотреть список всех участниц</a>
		<CategoryTable gender={Gender.FEMALE} categories={competition.categories.female} />
	</article>
</section>

<style>
	.male-participants {
		font-weight: 500;
	}

	.female-participants {
		font-weight: 500;
	}

    @media all and (max-width: 1024px) {
		.card {
			align-items: center;
            text-align: center;
		}
	}
</style>
