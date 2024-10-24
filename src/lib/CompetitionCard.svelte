<script lang="ts">
	import { locale } from '$lib/const';

	export let id: string;
	export let title: string;
	export let startDate: Date;
	export let endDate: Date;
	export let address: string;
	export let imagePath: string;
</script>

<a href="/competition/{id}" class="competiton-card">
	<article class="card">
		<img src={imagePath} alt="Fight of two wrestlers" />
		<div class="description">
			<h2>{title}</h2>
			<p>
				{#if startDate.getUTCDate() === endDate.getUTCDate()}
					{startDate.toLocaleDateString(locale, {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					})}
				{:else if startDate.getMonth() === endDate.getMonth()}
					{startDate.getDate()}-{endDate.getDate()}
					{endDate.toLocaleString(locale, { month: 'short' })}
					{endDate.getFullYear()} г.
				{:else}
					{startDate.getDate()}
					{startDate.toLocaleString(locale, { month: 'short' })} -
					{endDate.getDate()}
					{endDate.toLocaleString(locale, { month: 'short' })}
					{endDate.getFullYear()} г.
				{/if}
			</p>
			<p>{address}</p>
		</div>
	</article>
</a>

<style>
	a {
		display: block;
		text-decoration: none;
	}

	.card {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	img {
		height: 30vh;
		border: 1px solid black;
		border-radius: 6px;
	}

	.description {
		margin: 3vh;
	}

	@media all and (max-width: 1024px) {
		.card {
			padding-left: 0;
			padding-right: 0;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
