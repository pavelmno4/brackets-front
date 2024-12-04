import { GET } from "$lib/api/ApiUtils";
import type { Grid } from "$src/lib/types/competition/Grid.js";

export async function load({ params }) {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('gender', params.gender)
    if (params.year !== undefined) searchParams.set('ageCategory', params.year);
    if (params.weight !== undefined) searchParams.set('weightCategory', params.weight);

    const grid: Grid = await GET(`competitions/${params.id}/grids`, searchParams).then(response => response.json())

    return {
        nodes: grid.nodes,
        edges: grid.edges
    };
}