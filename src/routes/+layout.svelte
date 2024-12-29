<script lang="ts">
	import type { LayoutData } from './$types';
	import Header from './Header.svelte';

	export let data: LayoutData;
</script>

<Header user={data.user} />

<svelte:head>
	<title>Brackets</title>
</svelte:head>

<main class="container">
	<meta name="theme-color" content="#0E1118" media="(prefers-color-scheme: dark)">
	<slot />
</main>
