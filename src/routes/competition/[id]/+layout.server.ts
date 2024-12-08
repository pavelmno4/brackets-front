import { GET } from "$lib/api/ApiUtils"
import { mapToCompetition } from "$lib/mapper/CompetitionMapper"

export async function load({ params }) {
    const competition = await GET(`competitions/${params.id}`)
        .then(response => response.json())
        .then(response => mapToCompetition(response));

    return {
        competition: competition
    }
}