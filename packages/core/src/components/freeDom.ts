import {
  CSSProperties,
  onMounted,
  PropType,
  defineComponent,
  h,
  computed,
  inject,
  ref,
  reactive,
  isVue2, shallowRef, watch,
} from 'vue-demi';

import { useNormalizeStyle, useResize } from '../hooks';

import { onClickOutside, useElementSize } from '@vueuse/core';
import { EventBus, SceneToken, SceneTokenContext } from '../util';
import { v4 as uuidv4 } from 'uuid';
import { IPos } from './freeDomWrap';

const Dots = ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] as const;
type IDot = typeof Dots[number]

export const FreeDom = defineComponent({
  name: 'FreeDom',
  props: {
    x: {
      type: Number,
      default: undefined,
    },
    y: {
      type: Number,
      default: undefined,
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    absolute: {
      type: Boolean,
      default: undefined,
    },
    scale: {
      type: [Boolean, Array] as PropType<IDot[] | boolean>,
      default: undefined,
    },
    move: Boolean,
    preview: Boolean,
    limitWidth: {
      type: Number,
      default: undefined,
    },
    limitHeight: {
      type: Number,
      default: undefined,
    },
    handler: {
      type: String as PropType<'dot' | 'mark'>,
      default: undefined,
    },
    diagonal: {
      type: Boolean,
      default: undefined,
    },
    grid: {
      type: Object as PropType<[number, number]>,
      default: undefined,
    },
    onDragStart: {
      type: Function,
      default: undefined,
    },
    onDragEnd: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['update:x', 'update:y', 'update:width', 'update:height', 'select'],
  setup (props, { emit }) {
    const active = ref(false);
    const SceneContext = inject<SceneTokenContext>(SceneToken, undefined);
    const _preview = computed(() => SceneContext?.preview || props.preview);
    const canScale = computed(() => !_preview.value && (SceneContext?.scale || props.scale));
    const canMove = computed(() => !_preview.value && (SceneContext?.move || props.move));
    const isAbsolute = computed(() => props.absolute ?? SceneContext?.absolute ?? true);
    const handlerType = computed(() => props.handler ?? SceneContext?.handler ?? 'dot');
    const snapGrid = computed(() => props.grid ?? SceneContext?.grid);

    const diagonal = computed(() => props.diagonal ?? SceneContext?.diagonal ?? true);

    const widgetRef = shallowRef();
    const _style = ref<Partial<CSSProperties>>({});
    const wrapStyle = useNormalizeStyle(_style);
    const uuid = uuidv4();
    const isScale = ref(false);
    const isMove = ref(false);

    const _rect = reactive<IPos>({});

    const context = {
      _rect,
      trigger,
    };

    onClickOutside(widgetRef, () => {
      active.value = false;
    });

    let rectSize: {width: number, height: number} | null = reactive(useElementSize(widgetRef));
    let autoWidth = true;
    let autoHeight = true;
    const unwatch = watch(rectSize, ({ width, height }) => {
      if (autoWidth && width) {
        _rect.width = width;
      }
      if (autoHeight && height) {
        _rect.height = height;
      }
    });
    watch(
      [
        () => props.width,
        () => props.height,
        () => props.x,
        () => props.y,
      ],
      ([width, height, x, y]) => {
        autoWidth = width === _rect.width;
        autoHeight = height === _rect.height;
        if (!autoHeight && !autoWidth) {
          unwatch();
          rectSize = null;
        }
        width && (_rect.width = width);
        height && (_rect.height = height);
        x != null && (_rect.x = x);
        y != null && (_rect.y = y);
        trigger();
      }, { immediate: true });

    onMounted(async () => {
      SceneContext?.register(uuid, context);
      const { offsetTop, offsetLeft } = widgetRef.value;
      _rect.x = _rect.x == null ? offsetLeft : _rect.x;
      _rect.y = _rect.y == null ? offsetTop : _rect.y;
      trigger();
    });
    function trigger () {
      const { x, y, width, height } = _rect;
      _style.value = {
        transform: `translate(${x}px, ${y}px)`,
        width,
        height,
      };
    }

    const _dots = computed(() => {
      return SceneContext && Array.isArray(SceneContext.scale)
        ? SceneContext.scale
        : props.scale;
    });

    const dots = computed(() => {
      if (!isActive.value) return [];
      return Array.isArray(_dots.value) ? _dots.value : Dots;
    });
    const direct = {
      l: 'w',
      r: 'e',
      t: 'n',
      b: 's',
    };
    const isActive = shallowRef(true);

    function onMousedownDot (evt: MouseEvent, dot: string) {
      evt.stopPropagation();
      evt.preventDefault();
      if (isMove.value) return;
      isScale.value = true;
      active.value = true;

      const shouldUpdate = props.onDragStart?.();
      if (shouldUpdate === false) return;

      const { clientX, clientY } = evt;
      useResize(clientX, clientY, _rect, dot, diagonal.value, snapGrid.value, {
        onMove () {
          if (!checkValid(_rect)) return;
          EventBus.emit('move', uuid);
          trigger();
        },
        onUp () {
          props.onDragEnd?.();

          isScale.value = false;
          EventBus.emit('moveup', uuid);
          emitPos();
        },
      });
    }

    function emitPos () {
      emit('update:x', _rect.x);
      emit('update:y', _rect.y);
      emit('update:width', _rect.width);
      emit('update:height', _rect.height);
    }

    function getDotPos (dot: string): CSSProperties {
      const { width, height } = _rect;
      const isL = /l/.test(dot);
      const isR = /r/.test(dot);
      const isT = /t/.test(dot);
      // const isB = /b/.test(dot);

      let left, top;

      if (dot.length === 2) {
        left = isL ? 0 : width;
        top = isT ? 0 : height;
      } else {
        if (isL || isR) {
          left = isL ? 0 : width;
          top = Number(height) / 2;
        } else {
          left = Number(width) / 2;
          top = isT ? 0 : height;
        }
      }
      // TODO: 如果是mark需要另外计算不同位置的坐标，以保证显示在虚线框内部
      return {
        top: `${handlerType.value === 'dot' ? top : (top as number - 3)}px`,
        left: `${handlerType.value === 'dot' ? left : (left as number - 3)}px`,
        cursor:
          dot
            .split('')
            .reverse()
            .map((item) => direct[item as keyof typeof direct])
            .join('') + '-resize',
      };
    }
    function onMousedown (evt: MouseEvent) {
      evt.stopPropagation();
      if (isScale.value || !canMove.value) return;
      isMove.value = true;
      active.value = true;

      const shouldUpdate = props.onDragStart?.();
      if (shouldUpdate === false) return;

      const pos = { ..._rect };
      const move = (mouseEvt: MouseEvent) => {
        const { clientX, clientY } = mouseEvt;
        const x = clientX - evt.clientX + pos.x!;
        const y = clientY - evt.clientY + pos.y!;

        _rect.x = x;
        _rect.y = y;
        _rect.width = pos.width;
        _rect.height = pos.height;
        if (!checkValid(_rect)) return;
        EventBus.emit('move', uuid);
        trigger();
      };
      const up = () => {
        props.onDragEnd?.();

        isMove.value = false;
        EventBus.emit('moveup', uuid);
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emitPos();
        emit('select', _rect);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    function checkValid (rect: IPos) {
      if (SceneContext) {
        return SceneContext.checkValid(rect);
      } else if (props.limitWidth && props.limitHeight) {
        const { x, y, width, height } = rect;
        return x! >= 0 &&
          x! + width! <= props.limitWidth &&
          y! >= 0 &&
          y! + height! <= props.limitHeight;
      } else {
        return true;
      }
    }

    return {
      widgetRef,
      canMove,
      wrapStyle,
      canScale,
      dots,
      active,
      isAbsolute,
      isScale,
      handlerType,

      getDotPos,
      onMousedown,
      onMousedownDot,
    };
  },
  render () {
    const dots = this.canScale
      ? this.dots.map((dot) => {
        if (isVue2) {
          return h('div', {
            class: 'free-dom__widget-dot',
            style: this.getDotPos(dot),
            on: {
              mousedown: (evt: MouseEvent) => this.onMousedownDot(evt, dot),
            },
          });
        }
        return h('div', {
          class: this.handlerType === 'dot' ? 'free-dom__widget-dot' : 'free-dom__resizable-handler',
          style: this.getDotPos(dot),
          onMousedown: (evt: MouseEvent) => this.onMousedownDot(evt, dot),
        });
      })
      : null;

    const defaultSlot =
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default;
    if (isVue2) {
      return h(
        'section',
        {
          class: [
            'free-dom__widget-wrapper',
            { 'is-scale': this.isScale },
            { 'is-absolute': this.isAbsolute },
            { 'can-move': this.canMove },
            { 'is-active': this.active },
          ],
          style: this.wrapStyle,
          ref: 'widgetRef',
          on: {
            mousedown: this.onMousedown,
          },
        },
        [dots, defaultSlot],
      );
    }
    return h(
      'section',
      {
        ref: 'widgetRef',
        class: [
          'free-dom__widget-wrapper',
          { 'is-scale': this.isScale },
          { 'is-absolute': this.isAbsolute },
          { 'can-move': this.canMove },
          { 'is-active': this.active },
        ],
        style: this.wrapStyle,
        onMousedown: this.onMousedown,
      },
      [defaultSlot, dots],
    );
  },
});
