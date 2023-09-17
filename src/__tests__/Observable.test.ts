import Observable from "../Observable"

describe('Observable', () => {
  const prepObservable = () => {
    const observable = new Observable()
    const observerA = jest.fn()
    const observerB = jest.fn()
    observable.subscribe(observerA)
    observable.subscribe(observerB)

    return {observable, observerA, observerB}
  }

  describe('unsubscribe', () => {
    it('removes observer from observers', () => {
      const {observable, observerA, observerB} = prepObservable()
      
      expect(observable.observers).toContain(observerA)
      expect(observable.observers).toContain(observerB)
      
      observable.unsubscribe(observerB)

      expect(observable.observers).not.toContain(observerB)
    })
  })

  describe('notify', () => {
    it('calls all observers with given arguments', () => {
      const {observable, observerA, observerB} = prepObservable()

      const arg1 = {value: 'lorem ipsum'}
      const arg2 = [1, 2, 3]
      const arg3 = false
      observable.notify(arg1, arg2, arg3)

      expect(observerA).toHaveBeenCalledTimes(1)
      expect(observerB).toHaveBeenCalledTimes(1)
      expect(observerA).toHaveBeenCalledWith(arg1, arg2, arg3)
      expect(observerB).toHaveBeenCalledWith(arg1, arg2, arg3)
    })
  })
})