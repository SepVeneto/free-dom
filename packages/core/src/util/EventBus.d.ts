export declare class EventBus {
    private static _callbacks;
    static on(name: string, callback: Function): void;
    static emit(name: string, ...args: any): void;
    static off(name: string): void;
}
