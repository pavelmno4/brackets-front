import { GET, PATCH } from "$lib/api/ApiUtils";
import type { Grid } from "$src/lib/types/competition/Grid.js";

export async function load({ params }) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('gender', params.gender)
    if (params.year !== undefined) searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) searchParams.set('weightCategory', params.weight);

    const grid: Grid | null = await GET(`competitions/${params.id}/grids`, searchParams)
        .then(response => {
            if (response.status === 204) return null;
            return response.json();
        })

    return {
        grid: grid
    };
}

export const actions = {
    patchNode: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        return await PATCH(`competitions/${params.id}/grids/${data.get('gridId')}/nodes/${data.get('nodeId')}/winner`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                winnerNodeId: data.get('winnerNodeId')
            })
            .then(response => response.json());
    }
}