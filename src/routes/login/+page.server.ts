import { POST } from '$lib/api/ApiUtils';
import { fail, redirect, type HttpError } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const data: FormData = await request.formData();

        const credentials = new URLSearchParams();
        const login = data.get('login');
        const password = data.get('password');

        if (login !== null) credentials.set('username', login.toString());
        if (password !== null) credentials.set('password', password.toString());


        try {
            await POST(`login`, { 'Content-Type': 'application/x-www-form-urlencoded' }, credentials);
        } catch(error: any) {
            return fail(401, error.body)
        }
        redirect(301,'/upcoming')
    }
}