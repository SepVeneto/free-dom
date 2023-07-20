export class EventBus {
  private static _callbacks: Record<string, ((args?: any) => any)[]> = {}

  public static on(name: string, callback: (args?: any) => any) {
    if (!Array.isArray(EventBus._callbacks[name])) {
      EventBus._callbacks[name] = []
    }
    EventBus._callbacks[name].push(callback)
  }

  public static emit(name: string, ...args: any) {
    EventBus._callbacks[name]?.forEach(item => item.apply(this, args))
  }

  public static off(name: string) {
    EventBus._callbacks[name].length = 0
  }
}
