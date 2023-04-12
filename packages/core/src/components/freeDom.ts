import {
  CSSProperties,
  nextTick,
  onMounted,
  PropType,
  defineComponent,
  h,
  computed,
  inject,
  ref,
  reactive,
  isVue2, shallowRef, watchEffect,
} from 'vue-demi';

import { useNormalizeStyle } from '../hooks';

import { onClickOutside } from '@vueuse/core';
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
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
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
  },
  emits: ['update:x', 'update:y', 'update:width', 'update:height', 'select'],
  setup (props, { emit }) {
    const active = ref(false);
    const SceneContext = inject<SceneTokenContext>(SceneToken);
    const _preview = computed(() => SceneContext?.preview || props.preview);
    const canScale = computed(() => !_preview.value && (SceneContext?.scale || props.scale));
    const canMove = computed(() => !_preview.value && (SceneContext?.move || props.move));
    const isAbsolute = computed(() => props.absolute ?? SceneContext?.absolute ?? true);
    const widgetRef = shallowRef();
    const _style = ref<Partial<CSSProperties>>({});
    const wrapStyle = useNormalizeStyle(_style);
    const uuid = uuidv4();
    const isScale = ref(false);
    const isMove = ref(false);

    const _rect = reactive({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const context = {
      _rect,
      trigger,
    };

    onClickOutside(widgetRef, () => {
      active.value = false;
    });

    function parseNum (val: number | string) {
      return typeof val === 'number' ? val : parseFloat(val);
    }

    watchEffect(() => {
      _rect.width = props.width;
      _rect.height = props.height;
      _rect.x = props.x;
      _rect.y = props.y;
      console.log(_rect);
    });

    onMounted(async () => {
      SceneContext?.register(uuid, context);
      await nextTick();
      const rect = widgetRef.value.getBoundingClientRect();
      _rect.width = rect.width;
      _rect.height = rect.height;
      _rect.x = props.x ?? 0;
      _rect.y = props.y ?? 0;
      trigger();
      emitPos();
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

      const { x, y, width, height } = getStyle(_style.value);
      const cWidth = width;
      const cHeight = height;

      const startX = evt.clientX;
      const startY = evt.clientY;

      const isT = /t/.test(dot);
      const isL = /l/.test(dot);
      const isB = /b/.test(dot);
      const isR = /r/.test(dot);
      const isDiagonal = dot.length === 2;

      const move = (mouseEvt: MouseEvent) => {
        const currX = mouseEvt.clientX;
        const currY = mouseEvt.clientY;
        const deltaX = currX - startX;
        const deltaY = currY - startY;
        const rate = cWidth / cHeight;
        const newWidth = cWidth + (isL ? -deltaX : isR ? deltaX : 0);
        const newHeight = cHeight + (isT ? -deltaY : isB ? deltaY : 0);

        if (isDiagonal) {
          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            _rect.x = x + (isL ? deltaX : 0);
            _rect.width = newWidth < 0 ? 0 : newWidth;

            _rect.height = newWidth / rate;
          } else {
            _rect.y = y + (isT ? deltaY : 0);
            _rect.height = newHeight < 0 ? 0 : newHeight;

            _rect.width = newHeight * rate;
          }
        } else {
          _rect.x = x + (isL ? deltaX : 0);
          _rect.y = y + (isT ? deltaY : 0);
          _rect.width = newWidth < 0 ? 0 : newWidth;
          _rect.height = newHeight < 0 ? 0 : newHeight;
        }
        if (!checkValid(_rect)) return;
        EventBus.emit('move', uuid);
        trigger();
        // setPosition(pos);
      };
      const up = () => {
        isScale.value = false;
        EventBus.emit('moveup', uuid);
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emitPos();
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }

    function emitPos () {
      emit('update:x', _rect.x);
      emit('update:y', _rect.y);
      emit('update:width', _rect.width);
      emit('update:height', _rect.height);
    }

    function getDotPos (dot: string): CSSProperties {
      if (!_style.value) return {};
      const { width, height } = _style.value;
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
      return {
        top: top + 'px',
        left: left + 'px',
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
      const pos = getStyle(_style.value);
      const move = (mouseEvt: MouseEvent) => {
        const { clientX, clientY } = mouseEvt;
        const x = clientX - evt.clientX + pos.x;
        const y = clientY - evt.clientY + pos.y;

        _rect.x = x;
        _rect.y = y;
        _rect.width = pos.width;
        _rect.height = pos.height;
        if (!checkValid(_rect)) return;
        EventBus.emit('move', uuid);
        trigger();
      };
      const up = () => {
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
        return x >= 0 && x + width <= props.limitWidth && y >= 0 && y + height <= props.limitHeight;
      } else {
        return true;
      }
    }
    function getStyle (style: CSSProperties) {
      const { transform, width, height } = style;
      const { x, y } = getPos(transform);
      return {
        x: x ? Number(x) : 0,
        y: y ? Number(y) : 0,
        width: parseFloat(width as string),
        height: parseFloat(height as string),
      };
    }
    function getPos (transform?: string) {
      if (!transform) {
        return {
          x: 0,
          y: 0,
        };
      }
      const posRegexp = /translate\(([.0-9]+)px[, ]+([.0-9]+)px\)/;
      const [, x, y] = posRegexp.exec(transform!) ?? [];
      return { x: parseNum(x), y: parseNum(y) };
    }

    return {
      widgetRef,
      canMove,
      wrapStyle,
      canScale,
      dots,
      active,
      isAbsolute,

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
          class: 'free-dom__widget-dot',
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
          { 'is-absolute': this.isAbsolute },
          { 'can-move': this.canMove },
          { 'is-active': this.active },
        ],
        style: this.wrapStyle,
        onMousedown: this.onMousedown,
      },
      [dots, defaultSlot],
    );
  },
});
