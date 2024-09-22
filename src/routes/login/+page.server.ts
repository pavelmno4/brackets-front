import { POST } from '$lib/api/ApiUtils';
import { parse } from 'cookie';
import { fail, redirect, type HttpError } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const actions = {
    default: async ({ cookies, request }) => {
        const data: FormData = await request.formData();

        const credentials = new URLSearchParams();
        const login = data.get('login');
        const password = data.get('password');

        if (login !== null) credentials.set('username', login.toString());
        if (password !== null) credentials.set('password', password.toString());


        try {
            await POST(`login`, { 'Content-Type': 'application/x-www-form-urlencoded' }, credentials)
                .then(respose => {
                    respose.headers.getSetCookie().forEach(cookie => {
                        const parsedCookie: Record<string, string> = parse(cookie)

                        cookies.set('user_session', parsedCookie.user_session, {
                            httpOnly: true,
                            expires: new Date(parsedCookie.Expires),
                            sameSite: 'strict',
                            secure: !dev,
                            path: parsedCookie.Path
                        })
                    })
                });
        } catch (error: any) {
            return fail(401, error.body)
        }
        redirect(301, '/upcoming')
    }
}