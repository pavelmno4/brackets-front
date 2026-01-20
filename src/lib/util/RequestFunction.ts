import type { SubmitFunction } from "@sveltejs/kit";

export const sendRequest: SubmitFunction = ({ action, cancel }) => {
    if (action.search === '?/close') cancel();

    return async ({ update }) => {
        await update();
    };
};