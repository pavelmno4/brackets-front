import type { Gender } from "./Gender";

export interface Grid {
    id: string;
    gender: Gender;
    ageCategory: string;
    weightCategory: string;
    nodes: Array<Node>;
    edges: Array<Edge>;
    firstPlaceParticipantId: string;
    secondPlaceParticipantId: string;
    thirdPlaceParticipantId: string;
    show: boolean;
}

export interface Node {
    id: string;
    data: {
        participantId: string;
        winner: boolean;
    } | undefined;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
}