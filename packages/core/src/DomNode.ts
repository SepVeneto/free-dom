import { CSSProperties } from "vue-demi"

interface IDom {
  x: number
  y: number
  width: number
  height: number
}

export class Dom {
  private _rect: IDom = { x: 0, y: 0, width: 0, height: 0 }

  public normalize(style: CSSProperties) {
    const { transform, width, height } = style;
    console.log(transform, width, height)
    const proxy = new Proxy({
      width: parseNum(width ?? 0),
      height: parseNum(height ?? 0),
      ...this.getPos(transform)
    }, {
      get: () => {
        return this._rect
      },
      set: (data, key, value) => {
        this._rect = {
          ...data,
          [key]: value
        }
        console.log('proxy', this._rect)
        return true
      }
    })
    return proxy
  }
  public getPos(transform?: string) {
    if (!transform) {
      return {
        x: 0,
        y: 0
      }
    }
    const posRegexp = /translate\((\d+)px[, ]+(\d+)px\)/;
    const [, x, y] = posRegexp.exec(transform!) ?? [];
    return { x: parseNum(x), y: parseNum(y) }
  }

  constructor() {
  }
  public setPosition(x: number | string, y: number | string) {
    console.log('set')
    this._rect.x = parseNum(x)
    this._rect.y = parseNum(y)
  }
  public getRect() {
    return this._rect
  }
}

function parseNum(val: number | string) {
  return typeof val === 'number' ? val : parseFloat(val)
}