'use strict';

var vueDemi = require('vue-demi');
var core = require('@vueuse/core');

function useNormalizeStyle(style) {
  const _style = vueDemi.ref({
    transition: "inherit"
  });
  vueDemi.watchEffect(() => {
    const res = Object.entries(vueDemi.unref(style)).reduce(
      (obj, _style2) => {
        const [key, value] = _style2;
        if (typeof value === "number") {
          obj[key] = `${value}px`;
        } else {
          obj[key] = value;
        }
        return obj;
      },
      {}
    );
    _style.value = {
      ..._style.value,
      ...res
    };
  });
  return _style;
}

var Wrapper = vueDemi.defineComponent({
  emits: ["update:customStyle"],
  props: {
    customStyle: {
      type: Object,
      required: true
    },
    scale: Boolean,
    move: Boolean
  },
  setup(props, { emit }) {
    const editorContext = vueDemi.inject("Editor", { preview: false });
    const _preview = vueDemi.computed(() => editorContext.preview);
    const _scale = vueDemi.computed(() => !_preview.value && props.scale);
    const _move = vueDemi.computed(() => !_preview.value && props.move);
    const widgetRef = vueDemi.shallowRef();
    const rect = core.useElementBounding(widgetRef);
    const _style = vueDemi.ref({});
    const wrapStyle = useNormalizeStyle(_style);
    vueDemi.onMounted(() => {
      normalizeCustomStyle();
    });
    async function normalizeCustomStyle() {
      const { width, height } = props.customStyle;
      let _width = width;
      let _height = height;
      _style.value = {
        transform: "translate(0, 0)",
        ...props.customStyle
      };
      await vueDemi.nextTick();
      _height = parseFloat(getComputedStyle(widgetRef.value).height);
      _width = parseFloat(getComputedStyle(widgetRef.value).width);
      _style.value = {
        ...props.customStyle,
        width: _width,
        height: _height
      };
    }
    core.onClickOutside(widgetRef, () => {
    });
    const dots = vueDemi.computed(() => {
      return isActive.value ? ["t", "r", "l", "b", "lt", "lb", "rt", "rb"] : [];
    });
    const direct = {
      l: "w",
      r: "e",
      t: "n",
      b: "s"
    };
    const isActive = vueDemi.shallowRef(true);
    function onMousedownDot(evt, dot) {
      evt.stopPropagation();
      evt.preventDefault();
      const { x, y, width, height } = getPos(_style.value);
      const cWidth = width ?? rect.width;
      const cHeight = height ?? rect.height;
      const startX = evt.clientX;
      const startY = evt.clientY;
      const isT = /t/.test(dot);
      const isL = /l/.test(dot);
      const isB = /b/.test(dot);
      const isR = /r/.test(dot);
      const move = (mouseEvt) => {
        const currX = mouseEvt.clientX;
        const currY = mouseEvt.clientY;
        const deltaX = currX - startX;
        const deltaY = currY - startY;
        const newWidth = cWidth + (isL ? -deltaX : isR ? deltaX : 0);
        const newHeight = cHeight + (isT ? -deltaY : isB ? deltaY : 0);
        const pos = {
          x: x + (isL ? deltaX : 0),
          y: y + (isT ? deltaY : 0),
          width: newWidth < 0 ? 0 : newWidth,
          height: newHeight < 0 ? 0 : newHeight
        };
        setPosition(pos);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        emit("update:customStyle", _style.value);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
    function setPosition(pos) {
      _style.value = {
        ...props.customStyle,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: pos.width,
        height: pos.height
      };
    }
    function getDotPos(dot) {
      if (!_style.value)
        return {};
      const { width, height } = _style.value;
      const isL = /l/.test(dot);
      const isR = /r/.test(dot);
      const isT = /t/.test(dot);
      /b/.test(dot);
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
        marginLeft: "-2px",
        marginTop: "-2px",
        top: top + "px",
        left: left + "px",
        cursor: dot.split("").reverse().map((item) => direct[item]).join("") + "-resize"
      };
    }
    function onMousedown(evt) {
      evt.stopPropagation();
      if (!_move.value)
        return;
      const pos = getPos(_style.value);
      const move = (mouseEvt) => {
        const { clientX, clientY } = mouseEvt;
        setPosition({
          ...pos,
          x: clientX - evt.clientX + Number(pos.x),
          y: clientY - evt.clientY + Number(pos.y)
        });
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        emit("update:customStyle", _style.value);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
    function getPos(style) {
      const { transform, width, height } = style;
      const posRegexp = /translate\((\d+)px[, ]+(\d+)px\)/;
      const [, x, y] = posRegexp.exec(transform) ?? [];
      return {
        x: x ? Number(x) : Number(width) / 2,
        y: y ? Number(y) : Number(height) / 2,
        width: parseFloat(width),
        height: parseFloat(height)
      };
    }
    return {
      widgetRef,
      _move,
      wrapStyle,
      _scale,
      dots,
      getDotPos,
      onMousedown,
      onMousedownDot
    };
  },
  render() {
    const dots = this._scale ? this.dots.map((dot) => {
      if (vueDemi.isVue2) {
        return vueDemi.h("div", {
          class: "widget-dot",
          style: this.getDotPos(dot),
          on: {
            onMousedown: (evt) => this.onMousedownDot(evt, dot)
          }
        });
      }
      return vueDemi.h("div", {
        class: "widget-dot",
        style: this.getDotPos(dot),
        onMousedown: (evt) => this.onMousedownDot(evt, dot)
      });
    }) : null;
    if (vueDemi.isVue2) {
      return vueDemi.h(
        "section",
        {
          class: ["widget-wrapper", { "can-move": this._move }],
          style: this.wrapStyle,
          attrs: {
            ref: (el) => this.widgetRef = el
          },
          on: {
            onMousedown: this.onMousedown
          }
        },
        [dots, vueDemi.h("div", {}, this.$slots.default?.())]
      );
    }
    return vueDemi.h(
      "section",
      {
        ref: (el) => this.widgetRef = el,
        class: ["widget-wrapper", { "can-move": this._move }],
        style: this.wrapStyle,
        onMousedown: this.onMousedown
      },
      [dots, vueDemi.h("div", {}, this.$slots.default?.())]
    );
  }
});

module.exports = Wrapper;
