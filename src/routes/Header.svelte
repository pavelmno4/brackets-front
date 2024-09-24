<script lang="ts">
	import type { User } from "$lib/types/user/User";

    let activeTab: string = 'upcoming';

    export let user: User;
</script>

<header class="container">
    <nav>
        <ul>
            <li><strong>brackets</strong></li>
        </ul>
        <ul>
            <li><a href="/upcoming" class="tab contrast" on:click={() => activeTab = 'upcoming'} class:active="{activeTab === 'upcoming'}">Предстоящие турниры</a></li>
            <li><a href="/past" class="tab contrast" on:click={() => activeTab = 'past'} class:active="{activeTab === 'past'}">Прошедшие турнины</a></li>
        </ul>
        <ul>
            <li>
                {#if user === undefined}
                    <a href="/login" class="contrast">Login</a>
                {:else}
                    <a data-sveltekit-reload href="/logout" class="contrast">Logout</a>
                {/if}
            </li>
        </ul>
    </nav>
</header>

<style>
    .tab {
        text-align: center;
    }

    .active {
        text-decoration: underline;
        background-color: var(--pico-color-azure-100);
    }
</style>