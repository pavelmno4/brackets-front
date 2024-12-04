export interface Grid {
    id: string,
    nodes: Array<Node>,
    edges: Array<Edge>
}

export interface Node {
    id: string,
    data: any
}

export interface Edge {
    id: string,
    source: string,
    target: string
}