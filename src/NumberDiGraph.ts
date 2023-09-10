class DiGraph {
  vertices: number[]
  adjacents: Map<number, number[]>
  
  constructor() {
    this.vertices = []
    this.adjacents = new Map()
  }

  addEdge(originVertex: number, destinationVertex: number) {
    this.vertices.push(originVertex)
    this.vertices.push(destinationVertex)
    const adjacentsForOrigin = this.adjacents.get(originVertex) || []
    if (!adjacentsForOrigin.includes(destinationVertex)) {
      adjacentsForOrigin.push(destinationVertex)
    }
    this.adjacents.set(originVertex, adjacentsForOrigin)
  }

  addVertex(vertex: number) {
    this.vertices.push(vertex)
  }

  removeEdge(origin: number, destination: number) {
    const adjacentsForOrigin = this.adjacents.get(origin)
    if (adjacentsForOrigin) {
      this.adjacents.set(origin, adjacentsForOrigin.filter((v) => v !== destination))
    }
  }

  removeVertex(vertex: number) {
    const vertexIndex = this.vertices.findIndex((v) => v === vertex)
    if (vertexIndex > -1) {
      this.vertices.splice(vertexIndex)
      this.adjacents.delete(vertex)
      this.adjacents.forEach((_, currentVertex) => {
        this.removeEdge(currentVertex, vertex)
      })
    }
  }

  depthFirstSearch() {
    const visited: number[] = []

    const search = (vertex: number | undefined) => {
      if (!vertex || visited.includes(vertex)) {
        return
      }
      visited.push(vertex)
      this.adjacents.get(vertex)?.forEach(search)
    }

    this.vertices.forEach(search)

    return visited
  }

  breadthFirstSearch() {
    const visited: number[] = []

    const search = (vertex: number | undefined) => {
      const queue: number[] = []

      if (!vertex || visited.includes(vertex)) {
        return
      }

      queue.push(vertex)
      visited.push(vertex)
      
      while (queue.length > 0) {
        const currentVertex = queue.shift()

        if (!currentVertex) {
          return
        }

        this.adjacents.get(currentVertex)?.forEach((adjVertex) => {
          if (!visited.includes(adjVertex)) {
            visited.push(adjVertex)
            queue.push(adjVertex)
          }
        })
      }
    }

    this.vertices.forEach((vertex) => search(vertex))

    return visited
  }
}

export default DiGraph