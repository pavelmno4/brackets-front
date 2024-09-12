import { GET } from "$lib/api/ApiUtils"
import { mapToCompetition } from "$lib/mapper/CompetitionMapper"

export async function load() {
    const jsonResponse = await GET('http://localhost:8080/competitions/upcoming')
    const competitions = jsonResponse.map((response: any) => mapToCompetition(response))
    return {
        competitions: competitions
    };
}