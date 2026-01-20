import { GET, PATCH, POST } from "$src/lib/api/ApiUtils";
import type { Grid } from "$src/lib/types/competition/Grid";
import { fail } from "assert";

export async function load({ params }) {
    const grids: Array<Grid> = await GET(`competitions/${params.id}/grids`)
        .then(response => {
            if (response.status === 204) return [];
            return response.json();
        });

    return {
        grids: grids
    };
}

export const actions = {
    generateGrids: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();


        const response = await POST(`competitions/${params.id}/grids`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                gender: data.get('gender'),
                ageCategory: data.get('yearRange')
            });

        if (!response.ok) {
            return fail(response.statusText);
        }

        return response.json();
    },
    changeVisibility: async ({ cookies, request, params }) => {
        const user_session = cookies.get('user_session');
        const data: FormData = await request.formData();


        const response = await PATCH(`competitions/${params.id}/grids/visibility`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {
                gender: data.get('gender'),
                ageCategory: data.get('yearRange'),
                show: data.get('show')
            });

        if (!response.ok) {
            return fail(response.statusText);
        }

        return response.json();
    },
}