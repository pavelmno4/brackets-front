<script lang="ts">
	import { enhance } from '$app/forms';
	import { validate } from '$lib/util/PageFunction';

	let login: string;
	let password: string;
</script>

<section id="registration">
	<article class="card">
		<form method="POST" use:enhance>
			<h5 class="title">Авторизация</h5>

			<label for="text">Логин</label>
			<input
				type="text"
				id="login"
				name="login"
				maxlength="255"
				bind:value={login}
				on:focusout={(event) => validate(event, () => login !== undefined && login !== '')}
				required
			/>

			<label for="text">Пароль</label>
			<input
				type="password"
				id="password"
				name="password"
				maxlength="255"
				bind:value={password}
				on:focusout={(event) => validate(event, () => password !== undefined && password !== '')}
				required
			/>

			<button type="submit">Войти</button>
		</form>
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}

	.title {
		text-align: center;
	}
</style>
