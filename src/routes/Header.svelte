<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$lib/types/user/User';

	let activeTab: string = 'upcoming';

	export let user: User;
</script>

<header class="container">
	<nav>
		<ul>
			<li class="app-name"><strong>brackets</strong></li>
		</ul>
		<ul>
			<li>
				<div role="group">
					<button
						class="outline secondary"
						aria-current={activeTab === 'upcoming'}
						on:click={() => {
							activeTab = 'upcoming';
							goto('/upcoming');
						}}
					>
						Предстоящие турниры
					</button>
					<button
						class="outline secondary"
						aria-current={activeTab === 'past'}
						on:click={() => {
							activeTab = 'past';
							goto('/past');
						}}
					>
						Прошедшие турниры
					</button>
				</div>
			</li>
		</ul>
		<ul>
			<li>
				{#if user === undefined}
					<a href="/login">
						<img class="login-icon" src="/login-icon.svg" alt="login icon" />
					</a>
				{:else}
					<a data-sveltekit-reload href="/logout">
						<img class="logout-icon" src="/logout-icon.svg" alt="logout icon" />
					</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<style>
	.login-icon {
		width: 34px;
		height: 34px;
		transform: rotate(180deg);
	}

	.logout-icon {
		width: 34px;
		height: 34px;
		transform: rotate(180deg);
	}

	@media all and (max-width: 1024px) {
		.app-name {
			font-size: small;
		}
	}
</style>
