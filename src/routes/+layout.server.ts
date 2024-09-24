import { GET } from "$lib/api/ApiUtils"
import { error } from "@sveltejs/kit"

export async function load({ cookies }) {
    let user_session = cookies.get('user_session')

    let user = user_session !== undefined
        ? await GET('users/me', undefined, { 'Cookie': `user_session=${user_session}` })
            .then(response => response.json())
            .catch(err => { err.status === 401 ? undefined : error(err.status) })
        : undefined

    return {
        user: user
    }
}