import { GET, POST } from "$lib/api/ApiUtils";
import { mapToCompetition } from "$lib/mapper/CompetitionMapper";

export async function load({ params }) {
    const categories = await GET(`http://localhost:8080/competitions/${params.id}`)
                                .then(response => mapToCompetition(response))
                                .then(competition => competition.categories);
    const teams = await GET(`http://localhost:8080/competitions/${params.id}/participants/teams`)
    return {
        categories: categories,
        teams: teams
    };
}

export const actions = {
    default: async ({ request, params }) => {
        const data: FormData = await request.formData();
        POST(`http://localhost:8080/competitions/${params.id}/participants`,
            {
                fullName: data.get('fio'),
                birthYear: data.get('birthYear'),
                gender: data.get('gender'),
                ageCategory: data.get('ageCategory'),
                weightCategory: data.get('weightCategory'),
                team: data.get('team')
            }
        );
    }
}