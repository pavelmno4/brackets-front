import { GET } from "$lib/api/ApiUtils";
import { mapToCompetition } from "$lib/mapper/CompetitionMapper";



export async function load({ params }) {
    const url = new URL(`http://localhost:8080/competitions/${params.id}/participants`);
    url.searchParams.set('gender', params.gender);
    if (params.year !== undefined) url.searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) url.searchParams.set('weightCategory', params.weight);

    const participants = await GET(url.href)

    return {
        participants: participants
    };
}