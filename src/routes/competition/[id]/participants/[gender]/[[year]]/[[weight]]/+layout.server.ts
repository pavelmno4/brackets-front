import { GET } from "$lib/api/ApiUtils";
import { mapToParticipant } from "$src/lib/mapper/ParticipantMapper.js";

export async function load({ params }) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('gender', params.gender)
    if (params.year !== undefined) searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) searchParams.set('weightCategory', params.weight);

    const jsonResponse = await GET(`competitions/${params.id}/participants`, searchParams).then((response) => response.json());
    const participants = jsonResponse.map((participant: any) => mapToParticipant(participant));

    return {
        participants: participants
    };
}