import type { Competition } from "$lib/types/competition/Competition";

export function mapToCompetition(json: any): Competition {
    return {
        id: json.id,
        title: json.title,
        startDate: new Date(Date.parse(json.startDate)),
        endDate: new Date(Date.parse(json.endDate)),
        address: json.address,
        imagePath: json.imagePath,
        categories: json.categories
    }
}