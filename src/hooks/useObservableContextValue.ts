import { useEffect, useState, useContext } from "react"
import Observable from "../Observable"
import usePrevious from "./usePrevious"
import ObservablesContext from "../context/ObservablesContext"

const useObservablesContext = <T>(valueRef: T, callback: (...args: unknown[]) => void) => {
  const observablesContext = useContext(ObservablesContext)
  const [observable, setObservable] = useState(observablesContext.observables.get(valueRef))
  const previousValue = usePrevious(valueRef)

  useEffect(() => {
    if (!observable) {
      observablesContext.addObserver(valueRef, callback)
      setObservable(observablesContext.observables.get(valueRef))
    }
  }, [callback, observable, observablesContext, valueRef])

  useEffect(() => {
    if (JSON.stringify(valueRef) !== JSON.stringify(previousValue)) {
      observable?.notify(valueRef)
    }
  }, [callback, observable, previousValue, valueRef])

  return observable
}

export default useObservablesContext