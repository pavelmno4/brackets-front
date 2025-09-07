import { GET, POST } from "$lib/api/ApiUtils";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    startCompetition: async ({ cookies, params }) => {
        const user_session = cookies.get('user_session');

        const response = await POST(`competitions/${params.id}/start`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {}
        );

        if (!response.ok) {
            return fail(400, {});
        }

        return redirect(301, `${params.id}`)
    },
    generateGrids: async ({ cookies, params }) => {
        const user_session = cookies.get('user_session');

        const response = await POST(`/competitions/${params.id}/grids`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {}
        );

        if (!response.ok) {
            return fail(400, {});
        }

        return redirect(301, `${params.id}`)
    },
    downloadGrids: async ({ cookies, params }) => {
        const user_session = cookies.get('user_session');

        const response = await GET(`/competitions/${params.id}/files/grids`,
            undefined,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            }
        );

        if (!response.ok) {
            return fail(400, {});
        }

        return redirect(301, `${params.id}`)
    },
    completeCompetition: async ({ cookies, params }) => {
        const user_session = cookies.get('user_session');

        const response = await POST(`/competitions/${params.id}/complete`,
            {
                'Content-Type': 'application/json',
                'Cookie': `user_session=${user_session}`
            },
            {}
        );

        if (!response.ok) {
            return fail(400, {});
        }

        return redirect(301, `${params.id}`)
    }
}