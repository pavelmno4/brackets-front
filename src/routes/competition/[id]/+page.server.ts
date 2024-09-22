import { GET } from "$lib/api/ApiUtils"
import { mapToCompetition } from "$lib/mapper/CompetitionMapper"

export async function load({ params, cookies }) {
    const user = await GET('users/me', undefined, { 'Cookie': `user_session=${cookies.get('user_session')}` })
        .then(response => response.json())

    return await GET(`competitions/${params.id}`)
        .then(response => response.json())
        .then(response => mapToCompetition(response));
}