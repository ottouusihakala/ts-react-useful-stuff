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
    if (!adjacentsForOrigin.includes(destinationVertex)) {
      adjacentsForOrigin.push(destinationVertex)
    }
    this.adjacents.set(originVertex, adjacentsForOrigin)
  }

  addVertex(vertex: Number) {
    this.vertices.push(vertex)
  }

  removeEdge(origin: Number, destination: Number) {
    const adjacentsForOrigin = this.adjacents.get(origin)
    if (adjacentsForOrigin) {
      this.adjacents.set(origin, adjacentsForOrigin.filter((v) => v !== destination))
    }
  }

  removeVertex(vertex: Number) {
    const vertexIndex = this.vertices.findIndex((v) => v === vertex)
    if (vertexIndex > -1) {
      this.vertices.splice(vertexIndex)
      this.adjacents.delete(vertex)
      this.adjacents.forEach((_, currentVertex) => {
        this.removeEdge(currentVertex, vertex)
      })
    }
  }
}

export default DiGraph