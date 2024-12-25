import type { CategoriesByGender } from './CategoryByGender';
import type { Stage } from './Stage';

export interface Competition {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    address: string;
    imagePath: string;
    categories: CategoriesByGender;
    stage: Stage
}