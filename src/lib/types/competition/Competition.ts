import type { CategoriesByGender } from './CategoryByGender';

export interface Competition {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    address: string;
    imagePath: string;
    categories: CategoriesByGender;
}