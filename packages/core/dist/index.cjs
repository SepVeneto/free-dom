'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
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
    _style.value = __spreadValues$1(__spreadValues$1({}, _style.value), res);
  });
  return _style;
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const FreeDom = vueDemi.defineComponent({
  name: "FreeDom",
  emits: ["update:customStyle", "select"],
  props: {
    customStyle: {
      type: Object,
      required: true
    },
    scale: Boolean,
    move: Boolean,
    active: Boolean
  },
  setup(props, { emit }) {
    const editorContext = vueDemi.inject("Editor", { preview: false });
    const _preview = vueDemi.computed(() => editorContext.preview);
    const canScale = vueDemi.computed(() => !_preview.value && props.scale);
    const canMove = vueDemi.computed(() => !_preview.value && props.move);
    const widgetRef = vueDemi.shallowRef();
    const _style = vueDemi.ref({});
    const wrapStyle = useNormalizeStyle(_style);
    vueDemi.onMounted(() => {
      normalizeCustomStyle();
    });
    async function normalizeCustomStyle() {
      const { width, height } = props.customStyle;
      let _width = width;
      let _height = height;
      _style.value = __spreadValues({
        transform: "translate(0, 0)"
      }, props.customStyle);
      await vueDemi.nextTick();
      const rect = widgetRef.value.getBoundingClientRect();
      _width = rect.width;
      _height = rect.height;
      _style.value = __spreadProps(__spreadValues({}, props.customStyle), {
        width: _width,
        height: _height
      });
    }
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
      const cWidth = width;
      const cHeight = height;
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
      _style.value = __spreadProps(__spreadValues({}, props.customStyle), {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: pos.width,
        height: pos.height
      });
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
      emit("select");
      evt.stopPropagation();
      if (!canMove.value)
        return;
      const pos = getPos(_style.value);
      const move = (mouseEvt) => {
        const { clientX, clientY } = mouseEvt;
        setPosition(__spreadProps(__spreadValues({}, pos), {
          x: clientX - evt.clientX + Number(pos.x),
          y: clientY - evt.clientY + Number(pos.y)
        }));
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
      var _a;
      const { transform, width, height } = style;
      const posRegexp = /translate\((\d+)px[, ]+(\d+)px\)/;
      const [, x, y] = (_a = posRegexp.exec(transform)) != null ? _a : [];
      return {
        x: x ? Number(x) : 0,
        y: y ? Number(y) : 0,
        width: parseFloat(width),
        height: parseFloat(height)
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
      onMousedownDot
    };
  },
  render() {
    console.log("render");
    const dots = this.canScale ? this.dots.map((dot) => {
      if (vueDemi.isVue2) {
        return vueDemi.h("div", {
          class: "widget-dot",
          style: this.getDotPos(dot),
          on: {
            mousedown: (evt) => this.onMousedownDot(evt, dot)
          }
        });
      }
      return vueDemi.h("div", {
        class: "widget-dot",
        style: this.getDotPos(dot),
        onMousedown: (evt) => this.onMousedownDot(evt, dot)
      });
    }) : null;
    const defaultSlot = typeof this.$slots.default === "function" ? this.$slots.default() : this.$slots.default;
    if (vueDemi.isVue2) {
      return vueDemi.h(
        "section",
        {
          class: [
            "widget-wrapper",
            { "can-move": this.canMove },
            { "is-active": this.active }
          ],
          style: this.wrapStyle,
          ref: "widgetRef",
          on: {
            mousedown: this.onMousedown
          }
        },
        [dots, defaultSlot]
      );
    }
    return vueDemi.h(
      "section",
      {
        ref: "widgetRef",
        class: [
          "widget-wrapper",
          { "can-move": this.canMove },
          { "is-active": this.active }
        ],
        style: this.wrapStyle,
        onMousedown: this.onMousedown
      },
      [dots, defaultSlot]
    );
  }
});

class Scene$1 {
  constructor() {
  }
}

const freeDom = FreeDom;
const Scene = Scene$1;

exports.Scene = Scene;
exports.freeDom = freeDom;
