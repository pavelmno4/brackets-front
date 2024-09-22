import { GET } from "$lib/api/ApiUtils"
import { mapToCompetition } from "$lib/mapper/CompetitionMapper"

export async function load({ params }) {
    return await GET(`competitions/${params.id}`)
        .then(response => response.json())
        .then(response => mapToCompetition(response));
}