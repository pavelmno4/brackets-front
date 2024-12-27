import { GET, PATCH, POST } from "$lib/api/ApiUtils";
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
    selectWinner: async ({ cookies, request, params }) => {
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
    },
    swapNodes: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        return await PATCH(`competitions/${params.id}/grids/${data.get('gridId')}/nodes/swap`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                firstNodeId: data.get('firstNodeId'),
                secondNodeId: data.get('secondNodeId')
            })
            .then(response => response.json());
    },
    patchPedestal: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        const firstPlace = data.get('firstPlace') !== 'undefined' ? data.get('firstPlace') : null;
        const secondPlace = data.get('secondPlace') !== 'undefined' ? data.get('secondPlace') : null;
        const thirdPlace = data.get('thirdPlace') !== 'undefined' ? data.get('thirdPlace') : null;

        return await PATCH(`competitions/${params.id}/grids/${data.get('gridId')}/medalists`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                firstPlaceParticipantId: firstPlace,
                secondPlaceParticipantId: secondPlace,
                thirdPlaceParticipantId: thirdPlace
            })
            .then(response => response.json());
    },
    generateGrid: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();

        return await POST(`competitions/${params.id}/grids/single`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                gender: data.get('gender'),
                ageCategory: data.get('yearRange'),
                weightCategory: data.get('weightCategory')
            })
            .then(response => response.json());
    },
}