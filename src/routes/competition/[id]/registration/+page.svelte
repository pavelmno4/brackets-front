<script lang="ts">
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import type { Gender } from '$lib/types/competition/Gender';
    import type { SubmitFunction } from '@sveltejs/kit';
    import Modal from '$lib/Modal.svelte';
	import { validate } from '$lib/util/PageFunction';

    export let data: PageData;

    $: categoriesMap = new Map(data.categories.map(category => [category.yearRange, category.weights]));
    $: weightCategories = categoriesMap.get(selectedAgeCategory)?.filter(i => i !== '') satisfies Array<string> | undefined;
    $: teams = data.teams satisfies Array<string>;
    $: competitionUrl = $page.url.toString().replace('/registration', '');

    let fullName: string;
    let birthYear: number;
    let selectedGender: Gender;
    let selectedAgeCategory: string;
    let selectedWeightCategory: string | undefined;
    let selectedTeam: string;
    let dataProcessingConsent: boolean = false;

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
        <form method="POST" use:enhance={submit}>
            <h5 class="title">Регистрация участника</h5>

            <label for="text">Фамилия, Имя</label>
            <input
                type="text"
                id="fio"
                name="fio"
                minlength="1"
                maxlength="255"
                bind:value={fullName}
                on:focusout={event => validate(event, () => fullName !== undefined && fullName !== '') }
                required
            />

            <label for="text">Год рождения</label>
            <input
                type="number"
                id="birthYear"
                name="birthYear"
                min={1970}
                bind:value={birthYear}
                on:focusout={event => validate(event, () => String(birthYear).match(/^\d{4}$/) != null) }
                required
            />

            <label for="text">Пол</label>
            <select
                id="gender"
                name="gender"
                bind:value={selectedGender}
                on:focusout={event => validate(event, () => selectedGender !== undefined) }
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
                        selectedWeightCategory = undefined
                        const elem = document.getElementById('weightCategory')
                        if (elem != null) validate({currentTarget: elem}, () => selectedWeightCategory !== undefined)
                    }
                }
                on:focusout={event => validate(event, () => selectedAgeCategory !== undefined) }
                required
            >
                <option selected disabled value={undefined}>Выберите возрастную категорию</option>
                {#each categoriesMap.keys() as ageCategory}
                    <option value={ageCategory}>{ageCategory}</option>
                {/each}
            </select>

            <label for="text">Весовая категория</label>
            <select
                id="weightCategory"
                name="weightCategory"
                bind:value={selectedWeightCategory}
                on:focusout={event => validate(event, () => selectedWeightCategory !== undefined) }
                required
            >
                {#if weightCategories !== undefined}
                    {#each weightCategories as weightCategory}
                        <option value={weightCategory}>{weightCategory}</option>
                    {/each}
                {:else}
                    <option selected disabled value={undefined}>Выберите возрастную категорию</option>
                {/if}
            </select>

            <label for="text">Команда</label>
            <input
                list="teams"
                id="team"
                name="team"
                bind:value={selectedTeam}
                on:focusout={event => validate(event, () => selectedTeam !== undefined && selectedTeam !== '') }
                required
            />
            <datalist id="teams">
                {#each teams as team}
                    <option value={team}></option>
                {/each}
            </datalist>

            <fieldset>
                <label class="data-processing-consent" for="data-processing-consent">
                    <input
                        type="checkbox"
                        id="dataProcessingConsent"
                        name="dataProcessingConsent"
                        bind:checked={dataProcessingConsent}
                        aria-invalid={!dataProcessingConsent}
                        required
                    />
                    Согласие на обработку персональных данных
                </label>
            </fieldset>

            <button class="registration-button" type="submit">Зарегистрироваться</button>
        </form>

        <Modal bind:showModal>
            <article class="modal">
                <header>
                    <h4>Участник зарегистрирован</h4>
                </header>
                <a href={competitionUrl} class="competition-link">На страницу турнира</a>
            </article>
        </Modal>
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

    .data-processing-consent {
        text-align: center;
    }

    .registration-button {
        color: black;
        background-color: var(--pico-color-azure-100);
        border: 1px solid gray;
        width: 100%;
    }

    .registration-button:hover {
        background-color: var(--pico-color-azure-150);
    }

    .modal {
        text-align: center;
    }

    .competition-link {
        color: black;
        background-color: var(--pico-color-azure-100);
        border: 1px solid gray;
        border-radius: 6px;
        width: 100%;
        padding: 14px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    .competition-link:hover {
        background-color: var(--pico-color-azure-150);
    }
</style>