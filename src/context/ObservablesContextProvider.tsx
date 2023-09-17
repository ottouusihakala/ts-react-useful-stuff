import { useState } from "react"
import ObserableContext from "./ObservablesContext"
import Observable from "../Observable"

const ObservableContextProvider = ({children}: {children: React.ReactNode}) => {
  const [observables, setObservables] = useState(new Map<unknown, Observable>())

  const addObserver = (value: unknown, observer: (...args: unknown[]) => void) => {
    const observable = observables.get(value) || new Observable()
    observable.subscribe(observer)
    observables.set(value, observable)
    setObservables(observables)
  }

  const removeObserver = (value: unknown, observer: (...args: unknown[]) => void) => {
    const observable = observables.get(value)
    if (observable) {
      observable.unsubscribe(observer)
    }
  }

  return (
    <ObserableContext.Provider value={{observables, addObserver, removeObserver}}>{children}</ObserableContext.Provider>
  )
}

export default ObservableContextProvider