<script lang="ts">
	import type { Participant } from '$src/lib/types/competition/Participant';
	import PedestalCombobox from './PedestalCombobox.svelte';

	export let gridId: string;
	export let participants: Array<Participant>;
	export let firstPlace: string;
	export let secondPlace: string;
	export let thirdPlace: string;
</script>

<hr />
<form class="pedestal" method="POST" action="?/patchPedestal">
	<input type="hidden" name="gridId" value={gridId} />
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<fieldset role="group">
		<PedestalCombobox
			{participants}
			filledParticipantId={firstPlace}
			inputName="firstPlace"
			placeholder="I место"
		/>
		<PedestalCombobox
			{participants}
			filledParticipantId={secondPlace}
			inputName="secondPlace"
			placeholder="II место"
		/>
		<PedestalCombobox
			{participants}
			filledParticipantId={thirdPlace}
			inputName="thirdPlace"
			placeholder="III место"
		/>
		<button type="submit">Сохранить</button>
	</fieldset>
</form>
