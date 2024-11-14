import type { RequestHandler } from "@sveltejs/kit";
import { POST as post } from "$lib/api/ApiUtils";
import { ORIGIN } from "$env/static/private";

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

export const GET: RequestHandler = async ({ params }) => {
    return fetch(`${ORIGIN}/zip/competition_grid_${params.id}.zip`);
}