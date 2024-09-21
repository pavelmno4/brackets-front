import { GET, POST } from "$lib/api/ApiUtils";
import { mapToCompetition } from "$lib/mapper/CompetitionMapper";

export async function load({ params }) {
    const categories = await GET(`competitions/${params.id}`)
        .then(response => mapToCompetition(response))
        .then(competition => competition.categories);
    const teams = await GET(`competitions/${params.id}/participants/teams`)
    return {
        categories: categories,
        teams: teams
    };
}

export const actions = {
    default: async ({ request, params }) => {
        const data: FormData = await request.formData();
        POST(`competitions/${params.id}/participants`,
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