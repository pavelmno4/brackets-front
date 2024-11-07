import { GET, PATCH } from "$lib/api/ApiUtils";

export async function load({ params }) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('gender', params.gender)
    if (params.year !== undefined) searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) searchParams.set('weightCategory', params.weight);

    const participants = await GET(`competitions/${params.id}/participants`, searchParams).then(response => response.json())

    return {
        participants: participants
    };
}

export const actions = {
    patch: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        return await PATCH(`competitions/${params.id}/participants/${data.get('id')}`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                fullName: data.get('fullName'),
                team: data.get('team'),
                weight: data.get('weight')
            })
            .then(response => response.json());
    }
}