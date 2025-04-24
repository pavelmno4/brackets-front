import type { Participant } from "../types/competition/Participant";

export function mapToParticipant(json: any): Participant {
    return {
        id: json.id,
        firstName: json.firstName,
        lastName: json.lastName,
        middleName: json.middleName,
        birthDate: new Date(Date.parse(json.birthDate)),
        ageCategory: json.ageCategory,
        weightCategory: json.weightCategory,
        weight: json.weight,
        team: json.team
    };
}