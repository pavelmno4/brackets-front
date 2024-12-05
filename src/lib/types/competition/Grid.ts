export interface Grid {
    id: string,
    nodes: Array<Node>;
    edges: Array<Edge>;
}

export interface Node {
    id: string;
    data: {
        participantFullName: string;
        team: string;
    } | undefined;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
}