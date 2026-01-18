import { POST } from "$src/lib/api/ApiUtils";
import { fail } from "assert";

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
}