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
  })
})