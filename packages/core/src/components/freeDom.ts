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
  reactive
} from 'vue-demi';

import { useNormalizeStyle } from '../hooks';
import { isVue2, shallowRef } from 'vue-demi';
import { onClickOutside } from '@vueuse/core'
import { EventBus, SceneToken  } from '../util';
import { v4 as uuidv4 } from 'uuid'

export const FreeDom = defineComponent({
  name: 'FreeDom',
  emits: ['update:customStyle', 'select'],
  props: {
    customStyle: {
      type: Object as PropType<Partial<CSSProperties>>,
      required: true,
    },
    scale: Boolean,
    move: Boolean,
  },
  setup(props, { emit }) {
    const active = ref(false)
    const SceneContext = inject<any>(SceneToken);
    const _preview = computed(() => /* editorContext.preview */ false);
    const canScale = computed(() => !_preview.value && props.scale);
    const canMove = computed(() => !_preview.value && props.move);
    const widgetRef = shallowRef();
    const _style = ref<Partial<CSSProperties>>({});
    const wrapStyle = useNormalizeStyle(_style);
    const uuid = uuidv4()

    const _rect = reactive({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })

    const context = {
      _rect,
      trigger,
    }

    onMounted(() => {
      SceneContext.register(uuid, context)
    })

    onClickOutside(widgetRef, () => {
      active.value = false;
    })

    function normalize(style: CSSProperties) {
      const { transform, width, height } = style;
      const { x, y } = getPos(transform)
      _rect.width = parseNum(width ?? 0)
      _rect.height = parseNum(height ?? 0)
      _rect.x = x
      _rect.y = y;
    }

    function parseNum(val: number | string) {
      return typeof val === 'number' ? val : parseFloat(val)
    }

    onMounted(async () => {
      _style.value = props.customStyle
      await nextTick();
      const rect = widgetRef.value.getBoundingClientRect();
      normalize(props.customStyle)
      _rect.width = rect.width
      _rect.height = rect.height
      trigger()
    });

    function trigger() {
      const { x, y, width, height } = _rect
      _style.value = {
        transform: `translate(${x}px, ${y}px)`,
        width: width,
        height: height,
      }
    }

    const dots = computed(() => {
      return isActive.value ? ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] : [];
    });
    const direct = {
      l: 'w',
      r: 'e',
      t: 'n',
      b: 's',
    };
    const isActive = shallowRef(true);

    function onMousedownDot(evt: MouseEvent, dot: string) {
      evt.stopPropagation();
      evt.preventDefault();

      const { x, y, width, height } = getStyle(_style.value);
      const cWidth = width;
      const cHeight = height;

      const startX = evt.clientX;
      const startY = evt.clientY;

      const isT = /t/.test(dot);
      const isL = /l/.test(dot);
      const isB = /b/.test(dot);
      const isR = /r/.test(dot);

      const move = (mouseEvt: MouseEvent) => {
        const currX = mouseEvt.clientX;
        const currY = mouseEvt.clientY;
        const deltaX = currX - startX;
        const deltaY = currY - startY;
        const newWidth = cWidth + (isL ? -deltaX : isR ? deltaX : 0);
        const newHeight = cHeight + (isT ? -deltaY : isB ? deltaY : 0);

        _rect.x = x + (isL ? deltaX : 0)
        _rect.y = y + (isT ? deltaY : 0)
        _rect.width = newWidth < 0 ? 0 : newWidth
        _rect.height = newHeight < 0 ? 0 : newHeight
        if (!SceneContext.checkValid(_rect)) return;
        EventBus.emit('move', uuid)
        trigger()
        // setPosition(pos);
      };
      const up = () => {
        EventBus.emit('moveup', uuid)
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emit('update:customStyle', _style.value);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }

    function getDotPos(dot: string): CSSProperties {
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
        marginLeft: '-2px',
        marginTop: '-2px',
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
    function onMousedown(evt: MouseEvent) {
      active.value = true;
      emit('select');
      evt.stopPropagation();
      if (!canMove.value) return;
      const pos = getStyle(_style.value);
      const move = (mouseEvt: MouseEvent) => {
        const { clientX, clientY } = mouseEvt;
        const x = clientX - evt.clientX + pos.x
        const y = clientY - evt.clientY + pos.y

        _rect.x = x
        _rect.y = y
        _rect.width = pos.width
        _rect.height = pos.height
        if (!SceneContext.checkValid(_rect)) return;
        EventBus.emit('move', uuid)
        trigger()
      };
      const up = () => {
        EventBus.emit('moveup', uuid)
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emit('update:customStyle', _style.value);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    function getStyle(style: CSSProperties) {
      const { transform, width, height } = style;
      const { x, y } = getPos(transform)
      return {
        x: x ? Number(x) : 0,
        y: y ? Number(y) : 0,
        width: parseFloat(width as string),
        height: parseFloat(height as string),
      };
    }
    function getPos(transform?: string) {
      if (!transform) {
        return {
          x: 0,
          y: 0
        }
      }
      const posRegexp = /translate\(([.0-9]+)px[, ]+([.0-9]+)px\)/;
      const [, x, y] = posRegexp.exec(transform!) ?? [];
      return { x: parseNum(x), y: parseNum(y) }
    }

    return {
      widgetRef,
      canMove,
      wrapStyle,
      canScale,
      dots,
      active,

      getDotPos,
      onMousedown,
      onMousedownDot,
    };
  },
  render() {
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
            { 'can-move': this.canMove },
            { 'is-active': this.active },
          ],
          style: this.wrapStyle,
          ref: 'widgetRef',
          on: {
            mousedown: this.onMousedown,
          },
        },
        [dots, defaultSlot]
      );
    }
    return h(
      'section',
      {
        ref: 'widgetRef',
        class: [
          'free-dom__widget-wrapper',
          { 'can-move': this.canMove },
          { 'is-active': this.active },
        ],
        style: this.wrapStyle,
        onMousedown: this.onMousedown,
      },
      [dots, defaultSlot]
    );
  },
});
