import { error } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';

type RequestOptions = {
    method: string,
    path: string,
    params: URLSearchParams | undefined,
    headers: any,
    data: any
}

async function send(requestOptions: RequestOptions) {
    const url = new URL(`${env.BACKEND_BASE_URL}/${requestOptions.path}`);
    requestOptions.params?.forEach((value, parameter) => url.searchParams.set(parameter, value));

    const opts: any = {
        method: requestOptions.method,
        headers: requestOptions.headers
    };

    if (requestOptions.data && opts.headers['Content-Type'] === 'application/json') {
        opts.body = JSON.stringify(requestOptions.data);
    } else if (requestOptions.data && opts.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        opts.body = requestOptions.data.toString();
    }

    return fetch(url.href, opts)
        .then(response => {
            if (response.ok) {
                return response
            }
            throw error(response.status)
        });
}


export async function GET(path: string, params: URLSearchParams | undefined = undefined, headers: any = {}): Promise<Response> {
    return send({ method: 'GET', path: path, params: params, headers: headers, data: undefined });
}

export async function POST(path: string, headers: any = { 'Content-Type': 'application/json' }, data: any): Promise<Response> {
    return send({ method: 'POST', path: path, params: undefined, headers: headers, data: data });
}

export async function PATCH(path: string, headers: any = {}, data: any): Promise<Response> {
    return send({ method: 'PATCH', path: path, params: undefined, headers: headers, data: data });
}

export async function PUT(path: string, data: any): Promise<Response> {
    return send({ method: 'PUT', path: path, params: undefined, headers: {}, data: data });
}

export async function DELETE(path: string): Promise<Response> {
    return send({ method: 'DELETE', path: path, params: undefined, headers: {}, data: undefined });
}