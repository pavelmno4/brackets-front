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
	<slot />
</main>
