<script lang="ts">
	import type { Participant } from '$src/lib/types/competition/Participant';
	import { Combobox, type Selected } from 'bits-ui';
	import '$src/app.pcss';

	export let participants: Array<Participant>;
	export let filledParticipantId: string | undefined;
	export let placeholder: string;
	export let inputName: string;

	$: participantsForCombobox = participants.map((participant) => {
		return {
			value: participant.id,
			label: `${participant.lastName} ${participant.firstName}`,
			team: participant.team
		};
	});
	const filledParticipant = participants.find(
		(participant) => participant.id === filledParticipantId
	);

	let selected: Selected<string> | undefined = filledParticipant
		? {
				value: filledParticipant.id,
				label: `${filledParticipant.lastName} ${filledParticipant.firstName}`
			}
		: undefined;
	let inputValue: string;
	let touchedInput = false;
	$: filteredParticipants =
		inputValue && touchedInput
			? participantsForCombobox.filter((participant) =>
					participant.label.toLowerCase().includes(inputValue.toLowerCase())
				)
			: participantsForCombobox;
</script>

<Combobox.Root items={filteredParticipants} bind:inputValue bind:touchedInput bind:selected>
	<Combobox.Input class="combobox-input" {placeholder} />
	<Combobox.Content class="combobox-content" sideOffset={8} side="top">
		<Combobox.Item class="combobox-item" value="undefined" label="Отсутствует">
			Отсутствует
			<Combobox.ItemIndicator class="indicator" asChild={false} />
		</Combobox.Item>
		{#each filteredParticipants as participant}
			<Combobox.Item class="combobox-item" value={participant.value} label={participant.label}>
				{participant.label} ({participant.team})
				<Combobox.ItemIndicator class="indicator" asChild={false} />
			</Combobox.Item>
		{/each}
	</Combobox.Content>
	<Combobox.HiddenInput name={inputName} value={selected?.value} />
</Combobox.Root>
