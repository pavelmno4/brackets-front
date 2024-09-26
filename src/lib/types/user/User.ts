import type { Role } from "./Role";

export interface User {
    login: string;
    roles: Array<Role>;
}