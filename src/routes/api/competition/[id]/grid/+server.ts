import type { RequestHandler } from "@sveltejs/kit";
import { POST as post } from "$lib/api/ApiUtils";

export const POST: RequestHandler = async ({ cookies, params }) => {
    const user_session = cookies.get('user_session');

    return post(
        `competitions/${params.id}/grid`,
        {
            'Cookie': `user_session=${user_session}`
        },
        undefined
    );
};