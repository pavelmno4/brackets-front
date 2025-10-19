<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Modal from '$lib/Modal.svelte';
	import { validate } from '$lib/util/PageFunction';
	import { goto } from '$app/navigation';
	import '$src/app.pcss';

	$: competitionUrl = $page.url.toString().replace('/viewer/registration', '');

	let firstName: string;
	let lastName: string;
	let middleName: string;
	let phone: string;
	let dataProcessingConsent: boolean = false;

	let showModal: boolean = false;
	const phoneRegex = /(^8|7|\+7)((\d{10})|(\(\d{3}\)\d{3}-?\d{2}-?\d{2}))$/;

	const submit: SubmitFunction = ({ cancel }) => {
		let lastNameValid = lastName !== undefined && lastName !== '';
		let firstNameValid = firstName !== undefined && firstName !== '';
		let middleNameValid = middleName !== undefined && middleName !== '';
		let phoneValid = phone !== undefined && phoneRegex.test(phone);

		if (!lastNameValid || !firstNameValid || !middleNameValid || !phoneValid) {
			console.log('Preventing invalid form submission');
			cancel();
		}

		return async ({ update }) => {
			await update();
			showModal = true;
		};
	};
</script>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={competitionUrl}>&larr; на страницу турнира</a></li>
	</ul>
</nav>
<section id="registration">
	<article class="card">
		<form class="form" method="POST" use:enhance={submit}>
			<h5 class="title">Регистрация зрителя</h5>

			<label for="text">Фамилия</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				minlength="1"
				maxlength="255"
				bind:value={lastName}
				on:focusout={(event) => validate(event, () => lastName !== undefined && lastName !== '')}
				required
			/>

			<label for="text">Имя</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				minlength="1"
				maxlength="255"
				bind:value={firstName}
				on:focusout={(event) => validate(event, () => firstName !== undefined && firstName !== '')}
				required
			/>

			<label for="text">Отчество</label>
			<input
				type="text"
				id="middleName"
				name="middleName"
				minlength="1"
				maxlength="255"
				bind:value={middleName}
				on:focusout={(event) =>
					validate(event, () => middleName !== undefined && middleName !== '')}
				required
			/>

			<label for="text">Телефон</label>
			<input
				type="text"
				id="phone"
				name="phone"
				minlength="10"
				maxlength="16"
				placeholder="+7(999)111-11-11"
				bind:value={phone}
				on:focusout={(event) =>
					validate(event, () => phone !== undefined && phoneRegex.test(phone))}
				required
			/>

			<fieldset>
				<label for="data-processing-consent">
					<details>
						<summary class="data-processing-consent">
							<input
								type="checkbox"
								id="dataProcessingConsent"
								name="dataProcessingConsent"
								bind:checked={dataProcessingConsent}
								aria-invalid={!dataProcessingConsent}
								required
							/>
							Согласие на обработку персональных данных
						</summary>
						<p class="data-processing-consent-text">
							В соответствии с требованиями статьи 9 Федерального закона от 27.07.2006 № 152-ФЗ «О
							персональных данных», даю свое согласие веб-ресурсу bracket-s.ru на автоматизированную
							обработку моих персональных данных, включающих фамилию, имя, отчество, номер телефона
							в целях осуществления процесса организации турнира. Предоставляю веб-ресурсу
							bracket-s.ru осуществлять все действия (операции) с моими персональными данными,
							включая сбор, систематизацию, накопление, хранение, обновление, изменение,
							использование, обезличивание, блокирование, уничтожение. Срок действия настоящего
							согласия - период времени до истечения установленных нормативными актами сроков
							хранения соответствующей информации или документов, размещенных в компонентах системы
							веб-ресурса bracket-s.ru. Настоящее согласие на обработку персональных данных может
							быть отозвано в порядке, установленном Федеральным законом Российской Федерации от
							27.07.2006 N 152-ФЗ «О персональных данных». В случае отзыва согласия на обработку
							моих персональных данных веб-ресурс bracket-s.ru вправе не прекращать их обработку до
							окончания срока действия настоящего согласия.
						</p>
					</details>
				</label>
			</fieldset>

			<button type="submit">Зарегистрироваться</button>
		</form>

		<Modal bind:showModal>
			<article class="modal">
				<header>
					<h4>Зритель успешно зарегистрирован</h4>
				</header>
				<button type="submit" on:click={() => goto(competitionUrl)}>На страницу турнира</button>
			</article>
		</Modal>
	</article>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: start;
		max-width: 460px;
	}

	.title {
		align-self: center;
	}

	.data-processing-consent {
		text-align: center;
		font-size: 85%;
	}

	.data-processing-consent-text {
		text-align: justify;
		font-size: 70%;
	}

	.modal {
		text-align: center;
	}
</style>
