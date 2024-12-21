<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Gender } from '$lib/types/competition/Gender';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Modal from '$lib/Modal.svelte';
	import { validate } from '$lib/util/PageFunction';
	import { goto } from '$app/navigation';
	import { Combobox } from 'bits-ui';
	import '$src/app.pcss';

	export let data: PageData;

	$: categoriesMap = new Map<Gender, Map<string, Array<string>>>([
		[
			Gender.MALE,
			data.categories.male.reduce(
				(accumulator, category) => (
					accumulator.set(category.yearRange, category.weights), accumulator
				),
				new Map<string, Array<string>>()
			)
		],
		[
			Gender.FEMALE,
			data.categories.female.reduce(
				(accumulator, category) => (
					accumulator.set(category.yearRange, category.weights), accumulator
				),
				new Map<string, Array<string>>()
			)
		]
	]);
	$: ageCategories = categoriesMap.get(selectedGender)?.keys() satisfies
		| MapIterator<string>
		| undefined;
	$: weightCategories = categoriesMap.get(selectedGender)?.get(selectedAgeCategory) satisfies
		| Array<string>
		| undefined;
	$: teams = data.teams satisfies Array<string>;
	$: competitionUrl = $page.url.toString().replace('/registration', '');

	let fullName: string;
	let birthDate: Date;
	let selectedGender: Gender;
	let selectedAgeCategory: string;
	let selectedWeightCategory: string | undefined;
	let dataProcessingConsent: boolean = false;

	// Combobox
	let inputValue = '';
	let touchedInput = false;
	$: filteredTeams =
		inputValue && touchedInput
			? teams.filter((team: string) => team.toLowerCase().includes(inputValue.toLowerCase()))
			: teams;

	let showModal: boolean = false;

	const submit: SubmitFunction = () => {
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
			<h5 class="title">Регистрация участника</h5>

			<label for="text">Фамилия, Имя</label>
			<input
				type="text"
				id="fio"
				name="fio"
				minlength="1"
				maxlength="255"
				bind:value={fullName}
				on:focusout={(event) => validate(event, () => fullName !== undefined && fullName !== '')}
				required
			/>

			<label for="date">Год рождения</label>
			<input
				type="date"
				id="birthDate"
				name="birthDate"
				bind:value={birthDate}
				on:focusout={(event) => validate(event, () => birthDate !== undefined)}
				required
			/>

			<label for="text">Пол</label>
			<select
				id="gender"
				name="gender"
				bind:value={selectedGender}
				on:focusout={(event) => validate(event, () => selectedGender !== undefined)}
				required
			>
				<option selected disabled value={undefined}>Выберите пол</option>
				<option value="MALE">Муж.</option>
				<option value="FEMALE">Жен.</option>
			</select>

			<label for="text">Возрастная категория</label>
			<select
				id="ageCategory"
				name="ageCategory"
				bind:value={selectedAgeCategory}
				on:change={() => {
					selectedWeightCategory = undefined;
					const elem = document.getElementById('weightCategory');
					if (elem != null)
						validate({ currentTarget: elem }, () => selectedWeightCategory !== undefined);
				}}
				on:focusout={(event) => validate(event, () => selectedAgeCategory !== undefined)}
				required
			>
				{#if ageCategories !== undefined}
					<option selected disabled value={undefined}>Выберите возрастную категорию</option>
					{#each ageCategories as ageCategory}
						<option value={ageCategory}>{ageCategory}</option>
					{/each}
				{:else}
					<option selected disabled value={undefined}>Выберите пол</option>
				{/if}
			</select>

			<label for="text">Весовая категория</label>
			<select
				id="weightCategory"
				name="weightCategory"
				bind:value={selectedWeightCategory}
				on:focusout={(event) => validate(event, () => selectedWeightCategory !== undefined)}
				required
			>
				{#if weightCategories !== undefined}
					<option selected disabled value={undefined}>Выберите весовую категорию</option>
					{#each weightCategories as weightCategory}
						<option value={weightCategory}>{weightCategory}</option>
					{/each}
				{:else}
					<option selected disabled value={undefined}>Выберите возрастную категорию</option>
				{/if}
			</select>

			<label for="text">Команда</label>
			<Combobox.Root items={filteredTeams} bind:inputValue bind:touchedInput>
				<Combobox.Input
					class="combobox-input"
					placeholder="Выберите или введите команду"
					required
				/>
				<Combobox.Content class="combobox-content" sideOffset={8} side="top">
					{#each filteredTeams as team}
						<Combobox.Item class="combobox-item" value={team} label={team}>
							{team}
							<Combobox.ItemIndicator class="indicator" asChild={false} />
						</Combobox.Item>
					{/each}
				</Combobox.Content>
				<Combobox.HiddenInput name="team" value={inputValue} />
			</Combobox.Root>

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
							обработку моих персональных данных, включающих фамилию, имя, год рождения, пол в целях
							осуществления процесса организации турнира. Предоставляю веб-ресурсу bracket-s.ru
							осуществлять все действия (операции) с моими персональными данными, включая сбор,
							систематизацию, накопление, хранение, обновление, изменение, использование,
							обезличивание, блокирование, уничтожение. Срок действия настоящего согласия - период
							времени до истечения установленных нормативными актами сроков хранения соответствующей
							информации или документов, размещенных в компонентах системы веб-ресурса bracket-s.ru.
							Настоящее согласие на обработку персональных данных может быть отозвано в порядке,
							установленном Федеральным законом Российской Федерации от 27.07.2006 N 152-ФЗ «О
							персональных данных». В случае отзыва согласия на обработку моих персональных данных
							веб-ресурс bracket-s.ru вправе не прекращать их обработку до окончания срока действия
							настоящего согласия.
						</p>
					</details>
				</label>
			</fieldset>

			<button type="submit">Зарегистрироваться</button>
		</form>

		<Modal bind:showModal>
			<article class="modal">
				<header>
					<h4>Участник успешно зарегистрирован</h4>
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
