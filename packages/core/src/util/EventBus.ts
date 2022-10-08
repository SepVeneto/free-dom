export class EventBus {
  private static _callbacks: Record<string, Function[]> = {}

  public static on(name: string, callback: Function) {
    if (!Array.isArray(EventBus._callbacks[name])) {
      EventBus._callbacks[name] = []
    }
    EventBus._callbacks[name].push(callback)
  }
  public static emit(name: string, ...args: any) {
    EventBus._callbacks[name]?.forEach(item => item.apply(this, args))
  }
}