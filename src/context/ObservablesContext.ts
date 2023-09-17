import { createContext } from "react";
import Observable from "../Observable";

type ObservablesContext = {
  observables: Map<unknown, Observable>
  addObserver: (value: unknown, observer: (...args: unknown[]) => void) => void
  removeObserver: (value: unknown, observer: (...args: unknown[]) => void) => void
}

const ObservablesContext = createContext<ObservablesContext>({
  observables: new Map(),
  addObserver: (value: unknown, fn: () => void) => {},
  removeObserver: (value: unknown, fn: () => void) => {}
})

export default ObservablesContext