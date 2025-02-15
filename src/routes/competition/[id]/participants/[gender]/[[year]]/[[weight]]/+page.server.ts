import { DELETE, PATCH } from "$lib/api/ApiUtils";

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
                weightCategory: data.get('weightCategory'),
                weight: data.get('weight')
            })
            .then(response => response.json());
    },
    deleteParticipant: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        return await DELETE(`competitions/${params.id}/participants/${data.get('id-for-delete')}`,
            { 'Cookie': `user_session=${user_session}` }
        )
        .then(response => { success: response.ok })
    }
}