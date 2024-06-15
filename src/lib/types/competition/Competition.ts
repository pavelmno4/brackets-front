import type { Category } from '$lib/types/competition/Category';

export interface Competition {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    address: string;
    imagePath: string;
    categories: Array<Category>;
}