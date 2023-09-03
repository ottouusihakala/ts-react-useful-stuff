class DiGraph {
  vertices: Number[]
  adjacents: Map<Number, Number[]>
  
  constructor() {
    this.vertices = []
    this.adjacents = new Map()
  }

  addEdge(originVertex: Number, destinationVertex: Number) {
    this.vertices.push(originVertex)
    this.vertices.push(destinationVertex)
    const adjacentsForOrigin = this.adjacents.get(originVertex) || []
    this.adjacents.set(originVertex, [...adjacentsForOrigin, destinationVertex])
  }
}

export default DiGraph