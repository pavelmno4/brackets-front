import { POST } from "$lib/api/ApiUtils";

export const actions = {
    default: async ({ request, params }) => {
        const data: FormData = await request.formData();

        return await POST(`competitions/${params.id}/viewers`,
            { 'Content-Type': 'application/json' },
            {
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),
                middleName: data.get('middleName'),
                phone: data.get('phone')
            })
            .then(response => response.json());
    }
}