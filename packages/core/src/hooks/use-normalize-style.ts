import { CSSProperties, ref, Ref, unref, watchEffect } from 'vue-demi';
type Style = Partial<Record<keyof CSSProperties, string | number>>
export function useNormalizeStyle(
  style: Style | Ref<any>,
) {

  const _style = ref({
    transition: 'inherit',
  })
  watchEffect(() => {
    const res = Object.entries(unref(style)).reduce<Partial<CSSProperties>>(
      (obj, _style) => {
        const [key, value] = _style;
        if (typeof value === 'number') {
          // @ts-ignore
          obj[key] = `${value}px`;
        } else {
          // @ts-ignore
          obj[key] = value;
        }
        return obj;
      }, {} as Partial<CSSProperties>)
      _style.value = {
        ..._style.value,
        ...res,
      }
  })
  return _style
}
