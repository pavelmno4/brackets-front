export async function GET(url: string): Promise<any> {
    return fetch(url).then(response => response.json());
}

export async function POST(url: string, data: any): Promise<any> {
    const options = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    };

    return fetch(url, options).then(response => response.json());
}

export async function PATCH(url: string, data: any): Promise<any> {
    const options = { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    };

    return fetch(url, options).then(response => response.json());
}

export async function PUT(url: string, data: any): Promise<any> {
    const options = { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    };

    return fetch(url, options).then(response => response.json());
}



export async function DELETE(url: string, data: any): Promise<any> {
    const options = { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options);
}