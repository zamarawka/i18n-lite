type EventEmitterCb = (...args: any[]) => any;

export default class EventEmitter<
  T extends { [key: string]: EventEmitterCb },
  K extends keyof T = keyof T,
> {
  callbacks: { [K in keyof T]?: T[K][] } = {};

  on<E extends K>(event: E, cb: T[E]) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(cb);
  }

  off<E extends K>(event: E, cb: T[E]) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter((c) => c !== cb);
    }
  }

  emit<E extends K>(event: E, ...payload: Parameters<T[E]>) {
    this.callbacks[event]?.forEach((cb) => cb(...payload));
  }
}
