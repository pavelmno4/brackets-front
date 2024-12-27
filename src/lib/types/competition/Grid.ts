export interface Grid {
    id: string,
    nodes: Array<Node>;
    edges: Array<Edge>;
    firstPlaceParticipantId: string;
    secondPlaceParticipantId: string;
    thirdPlaceParticipantId: string;
}

export interface Node {
    id: string;
    data: {
        participantId: string;
    } | undefined;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
}