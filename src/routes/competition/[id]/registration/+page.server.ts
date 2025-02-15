import { GET, POST } from "$lib/api/ApiUtils";
import { mapToCompetition } from "$lib/mapper/CompetitionMapper";

export async function load({ params }) {
    const categories = await GET(`competitions/${params.id}`)
        .then(response => response.json())
        .then(response => mapToCompetition(response))
        .then(competition => competition.categories);
    const teams = await GET(`competitions/${params.id}/participants/teams`).then(response => response.json())
    return {
        categories: categories,
        teams: teams
    };
}

export const actions = {
    default: async ({ request, params }) => {
        const data: FormData = await request.formData();

        POST(`competitions/${params.id}/participants`,
            { 'Content-Type': 'application/json' },
            {
                fullName: data.get('fio'),
                birthDate: data.get('birthDate'),
                gender: data.get('gender'),
                ageCategory: data.get('ageCategory'),
                weightCategory: data.get('weightCategory'),
                team: data.get('team')
            });
    }
}