export class Dom {
  private _x: number = 0
  private _y: number = 0
  private _width: number = 0
  private _height: number = 0
  constructor() {
    console.log(this._x, this._y, this._height, this._width)
  }

  public setRect(transform: string, width: number, height: number): void
  public setRect(x: number, y: number, width: number, height: number): void
  public setRect(p1: number | string, p2: number, p3: number, p4?: number) {
    if (typeof p1 === 'string') {
      const reg = /translate\((\d+)px,\s*(\d+)px\)/
      const [, x, y] = reg.exec(p1) ?? []
      this._x = parseFloat(x);
      this._y = parseFloat(y);
      this._width = p2;
      this._height = p3;
    } else if (p4) {
      this._x = p1;
      this._y = p2;
      this._width = p3;
      this._height = p4;
    }
  }

}