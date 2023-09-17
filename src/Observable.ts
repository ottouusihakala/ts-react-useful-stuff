class Observable {
  observers: ((...args: unknown[]) => void)[]

  constructor() {
    this.observers = []
  }

  subscribe(fn: (...args: unknown[]) => void) {
    this.observers.push(fn)
  }

  unsubscribe(fn: (...args: unknown[]) => void) {
    this.observers = this.observers.filter((observer) => observer !== fn)
  }

  notify(...args: unknown[]) {
    this.observers.forEach((observer) => observer(...args))
  }
}

export default Observable