import { CSSProperties, ref, Ref, unref, watch } from 'vue-demi';
type Style = Partial<Record<keyof CSSProperties, string | number>>
export function useNormalizeStyle (
  style: Style | Ref<any>,
) {
  const _style = ref({
    transition: 'inherit',
  });
  watch(() => style, (data) => {
    const res = Object.entries(unref(data)).reduce<Partial<CSSProperties>>(
      (obj, _style) => {
        const [key, value] = _style;
        if (typeof value === 'number') {
          // @ts-expect-error: css
          obj[key] = `${value}px`;
        } else {
          // @ts-expect-error: css
          obj[key] = value;
        }
        return obj;
      }, {} as Partial<CSSProperties>);
    _style.value = {
      ..._style.value,
      ...res,
    };
  }, { deep: true });
  return _style;
}
