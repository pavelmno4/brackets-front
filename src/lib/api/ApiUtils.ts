import { error } from "@sveltejs/kit";

const baseUrl: string = 'http://localhost:8080';

type RequestOptions = {
    method: string,
    path: string,
    params: URLSearchParams | undefined,
    headers: any,
    credentials: 'include' | undefined
    data: any
}

async function send(requestOptions: RequestOptions) {
    const url = new URL(`${baseUrl}/${requestOptions.path}`);
    requestOptions.params?.forEach((value, parameter) => url.searchParams.set(parameter, value));

    const opts: any = {
        method: requestOptions.method,
        credentials: requestOptions.credentials,
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
                return response.headers.get('Content-Type') === 'application/json'
                    ? response.json()
                    : {}
            }
            throw error(response.status)
        });
}


export async function GET(path: string, params: URLSearchParams | undefined = undefined): Promise<any> {
    return send({ method: 'GET', path: path, params: params, headers: {}, credentials: 'include', data: undefined });
}

export async function POST(path: string, headers: any = { 'Content-Type': 'application/json' }, data: any): Promise<any> {
    return send({ method: 'POST', path: path, params: undefined, headers: headers, credentials: 'include', data: data });
}

export async function PATCH(path: string, data: any): Promise<any> {
    return send({ method: 'PATCH', path: path, params: undefined, headers: {}, credentials: 'include', data: data });
}

export async function PUT(path: string, data: any): Promise<any> {
    return send({ method: 'PUT', path: path, params: undefined, headers: {}, credentials: 'include', data: data });
}

export async function DELETE(path: string): Promise<any> {
    return send({ method: 'DELETE', path: path, params: undefined, headers: {}, credentials: 'include', data: undefined });
}