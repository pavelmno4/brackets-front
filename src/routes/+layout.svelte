<script lang="ts">
	import type { LayoutData } from './$types';
	import Header from './Header.svelte';

	export let data: LayoutData;
</script>

<Header user={data.user} />

<main class="container">
	<slot />
</main>
