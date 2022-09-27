import './style.scss';
import {
  CSSProperties,
  nextTick,
  onMounted,
  PropType,
  defineComponent,
  h,
  computed,
  shallowRef,
  inject,
  ref,
  watchEffect,
  watch,
} from 'vue-demi';

import { useNormalizeStyle } from './hooks';
import { isVue2 } from 'vue-demi';
import { SceneToken } from './tokens'
import { Dom } from './DomNode'

export const FreeDom = defineComponent({
  name: 'FreeDom',
  emits: ['update:customStyle', 'select'],
  props: {
    customStyle: {
      type: Object as PropType<CSSProperties>,
      required: true,
    },
    scale: Boolean,
    move: Boolean,
    active: Boolean,
  },
  setup(props, { emit }) {
    const SceneContext = inject(SceneToken);
    const _preview = computed(() => /* editorContext.preview */ false);
    const canScale = computed(() => !_preview.value && props.scale);
    const canMove = computed(() => !_preview.value && props.move);
    const widgetRef = shallowRef();
    const _style = ref<Partial<CSSProperties>>({});
    const wrapStyle = useNormalizeStyle(_style);

    const domNode = new Dom()
    console.log(props.customStyle)
    const _rect = domNode.normalize(props.customStyle)

    watch(() => domNode.getRect(), (val) => {
      console.log('watch')
      _style.value = {
        transform: `translate(${val.x}px, ${val.y}px)`,
        width: val.width,
        height: val.height,
      }
    }, { deep: true })

    onMounted(async () => {
      await nextTick();
      console.log('trigger')
      const rect = widgetRef.value.getBoundingClientRect();
      console.log(rect)
      const _width = rect.width;
      const _height = rect.height;
      _rect.width = _width
      _rect.height = _height
      // domNode.setRect(_rect)
      // await SceneContext?.register(d)
    });
    // async function normalizeCustomStyle() {
    //   const { width, height } = props.customStyle;
    //   let _width = width;
    //   let _height = height;

    //   _style.value = {
    //     transform: 'translate(0, 0)',
    //     ...props.customStyle,
    //   };

    //   // 等待默认样式改变后，重新计算尺寸
    //   const rect = widgetRef.value.getBoundingClientRect();
    //   _width = rect.width;
    //   _height = rect.height;
    //   _style.value = {
    //     ...props.customStyle,
    //     width: _width,
    //     height: _height,
    //   };
    // }

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

      const { x, y, width, height } = getPos(_style.value);
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
        const pos = {
          x: (x as number) + (isL ? deltaX : 0),
          y: (y as number) + (isT ? deltaY : 0),
          width: newWidth < 0 ? 0 : newWidth,
          height: newHeight < 0 ? 0 : newHeight,
        };
        setPosition(pos);
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emit('update:customStyle', _style.value);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    function setPosition(pos: {
      x: number;
      y: number;
      width: number;
      height: number;
    }) {
      _style.value = {
        ...props.customStyle,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: pos.width,
        height: pos.height,
      };
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
      emit('select');
      evt.stopPropagation();
      if (!canMove.value) return;
      // componentData.current = props.element
      const pos = getPos(_style.value);
      const move = (mouseEvt: MouseEvent) => {
        const { clientX, clientY } = mouseEvt;
        domNode.setPosition(
          clientX - evt.clientX + Number(pos.x),
          clientY - evt.clientY + Number(pos.y)
        )
      };
      const up = () => {
        // console.log('drag', 'up')
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        emit('update:customStyle', _style.value);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
    function getPos(style: CSSProperties) {
      const { transform, width, height } = style;
      const posRegexp = /translate\((\d+)px[, ]+(\d+)px\)/;
      const [, x, y] = posRegexp.exec(transform!) ?? [];
      // console.log('getPos', x, y)
      return {
        x: x ? Number(x) : 0,
        y: y ? Number(y) : 0,
        width: parseFloat(width as string),
        height: parseFloat(height as string),
      };
    }

    return {
      widgetRef,
      canMove,
      wrapStyle,
      canScale,
      dots,

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
              class: 'widget-dot',
              style: this.getDotPos(dot),
              on: {
                mousedown: (evt: MouseEvent) => this.onMousedownDot(evt, dot),
              },
            });
          }
          return h('div', {
            class: 'widget-dot',
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
            'widget-wrapper',
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
          'widget-wrapper',
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
