import { GET } from "$lib/api/ApiUtils";

export async function load({ params }) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('gender', params.gender)
    if (params.year !== undefined) searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) searchParams.set('weightCategory', params.weight);

    const participants = await GET(`competitions/${params.id}/participants`, searchParams).then(response => response.json())

    return {
        participants: participants
    };
}