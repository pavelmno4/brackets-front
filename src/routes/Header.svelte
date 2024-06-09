<script lang="ts">
    import { page } from '$app/stores';
</script>

<header class="container">
    <nav>
        <ul>
            <li><strong>brackets</strong></li>
        </ul>
        <ul>
            <li><a href="/upcoming" class="tab contrast" class:active="{$page.url.pathname.includes('upcoming')}">Предстоящие турниры</a></li>
            <li><a href="/past" class="tab contrast" class:active="{$page.url.pathname.includes('past')}">Прошедшие турнины</a></li>
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