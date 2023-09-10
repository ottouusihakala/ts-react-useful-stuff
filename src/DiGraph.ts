class DiGraph<T> {
  vertices: T[]
  adjacents: Map<T, T[]>

  constructor() {
    this.vertices = []
    this.adjacents = new Map()
  }

  addEdge(origin: T, destination: T) {
    this.vertices.push(origin)
    this.vertices.push(destination)
    const adjacentsForOrigin = this.adjacents.get(origin) || []
    if (!adjacentsForOrigin.includes(destination)) {
      adjacentsForOrigin.push(destination)
    }
    this.adjacents.set(origin, adjacentsForOrigin)
  }

  addVertex(vertex: T) {
    this.vertices.push(vertex)
  }

  removeEdge(origin: T, destination: T) {
    const adjacentsForOrigin = this.adjacents.get(origin)
    if (adjacentsForOrigin) {
      this.adjacents.set(origin, adjacentsForOrigin.filter((v) => v !== destination))
    }
  }

  removeVertex(vertex: T) {
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
    const visited: T[] = []

    const search = (vertex: T | undefined) => {
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
    const visited: T[] = []

    const search = (vertex: T | undefined) => {
      const queue: T[] = []

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