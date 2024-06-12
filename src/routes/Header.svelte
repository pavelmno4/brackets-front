<script lang="ts">
    let activeTab: string = 'upcoming';
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
            <li><a href="/login" class="contrast">Login</a></li>
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