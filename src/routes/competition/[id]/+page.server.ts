import { GET } from "$lib/api/ApiUtils"
import { mapToCompetition } from "$lib/mapper/CompetitionMapper"

export async function load({ params }) {
    return await GET(`http://localhost:8080/competitions/${params.id}`).then(response => mapToCompetition(response));
}