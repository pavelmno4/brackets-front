import type { RequestHandler } from "@sveltejs/kit";
import { GET as get } from "$lib/api/ApiUtils";

export const GET: RequestHandler = async ({ cookies, params }) => {
    const user_session = cookies.get('user_session');

    return get(
        `competitions/${params.id}/grid`,
        undefined,
        {
            'Cookie': `user_session=${user_session}`
        }
    );
};