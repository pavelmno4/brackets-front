import { POST } from "$lib/api/ApiUtils";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    let user_session = cookies.get('user_session')

    if (user_session !== undefined) {
        POST('/logout', { 'Cookie': `user_session=${user_session}` }, undefined)
        cookies.delete('user_session', { path: '/' })
    }

    redirect(301, '/upcoming')
}