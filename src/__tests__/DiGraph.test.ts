import DiGraph from "../DiGraph"

describe('DiGraph', () => {
  describe('addEdge', () => {
    it('Adds vertices', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      expect(graph.vertices).toContain(1)
      expect(graph.vertices).toContain(2)
    })

    it('Adds edge from origin to destination vertex', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      expect(graph.adjacents.get(1)).toContain(2)
    })

    it('Does not add edge from destination to vertex', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.addEdge(2, 3)
      expect(graph.adjacents.get(2)).not.toContain(1)
      expect(graph.adjacents.get(3)).toBeFalsy()
    })

    it('Does not add duplicate destination vertices', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.addEdge(1, 2)
      expect(graph.adjacents.get(1)?.length).toBe(1)
      expect(graph.adjacents.get(1)).toContain(2)
    })
  })

  describe('removeEdge', () => {
    it('Removes edge from origin to destination', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.removeEdge(1, 2)
      expect(graph.adjacents.get(1)).not.toContain(2)
    })

    it('Does not remove origin nor destination', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.removeEdge(1, 2)
      expect(graph.vertices).toContain(1)
      expect(graph.vertices).toContain(2)
    })

    it('Does not remove connection from destination to origin', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.addEdge(2, 1)
      graph.removeEdge(1, 2)
      expect(graph.adjacents.get(1)).not.toContain(2)
      expect(graph.adjacents.get(2)).toContain(1)
    })
  })

  describe('removeVertex', () => {
    it('Removes vertex', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.removeVertex(2)
      expect(graph.vertices).not.toContain(2)
    })
    it('Removes all edges from the vertex', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.addEdge(1, 3)
      graph.removeVertex(1)
      expect(graph.adjacents.get(1)).toBeFalsy()
    })

    it('Removes all edges to the vertex', () => {
      const graph = new DiGraph()
      graph.addEdge(1, 2)
      graph.addEdge(3, 2)
      graph.removeVertex(2)
      expect(graph.adjacents.get(1)).not.toContain(2)
      expect(graph.adjacents.get(3)).not.toContain(2)
    })
  })
})