import { CSSProperties, Ref } from "vue-demi"
import { unrefElement } from '@vueuse/core'

interface IDom {
  x: number
  y: number
  width: number
  height: number
}

export class Dom {
  private _rect: IDom = { x: 0, y: 0, width: 0, height: 0 }
  private _observe: Ref<IDom>
  private _widgetRef: Ref


  constructor(observer: Ref, ele: Ref) {
    this._observe = observer
    this._widgetRef = ele
  }

  public normalize(style: CSSProperties) {
    const { transform, width, height } = style;
    this._rect = new Proxy({
      width: parseNum(width ?? 0),
      height: parseNum(height ?? 0),
      ...this.getPos(transform)
    }, {
      get: () => {
        return this._observe.value
      },
      set: (data, key, value) => {
        this._observe.value = {
          ...this._observe.value,
          [key]: value
        }
        return true
      }
    })
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

  public updateRect() {
    const rect = this._widgetRef.value.getBoundingClientRect();
    this._rect.width = rect.width
    this._rect.height = rect.height
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