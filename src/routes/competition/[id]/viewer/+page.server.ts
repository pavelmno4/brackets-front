import { GET } from "$src/lib/api/ApiUtils";

export async function load({ cookies, params }) {
    const userSession = cookies.get('user_session');

    const viewers = await GET(
        `competitions/${params.id}/viewers`,
        undefined,
        { 'Cookie': `user_session=${userSession}` }
    ).then(response => response.json())

    return {
        viewers: viewers
    };
}