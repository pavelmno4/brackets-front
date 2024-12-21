import type { Participant } from "../types/competition/Participant";

export function mapToParticipant(json: any): Participant {
    return {
        id: json.id,
        fullName: json.fullName,
        birthDate: new Date(Date.parse(json.birthDate)),
        weightCategory: json.weightCategory,
        weight: json.weight,
        team: json.team
    };
}