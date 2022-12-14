'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');
var core = require('@vueuse/core');
var uuid = require('uuid');

function useNormalizeStyle(style) {
  const _style = vueDemi.ref({
    transition: "inherit"
  });
  vueDemi.watch(() => style, (data) => {
    const res = Object.entries(vueDemi.unref(data)).reduce(
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
  }, { deep: true });
  return _style;
}

class EventBus {
  static _callbacks = {};
  static on(name, callback) {
    if (!Array.isArray(EventBus._callbacks[name])) {
      EventBus._callbacks[name] = [];
    }
    EventBus._callbacks[name].push(callback);
  }
  static emit(name, ...args) {
    EventBus._callbacks[name]?.forEach((item) => item.apply(this, args));
  }
  static off(name) {
    EventBus._callbacks[name].length = 0;
  }
}

const SceneToken = Symbol("Scene");

const Dots = ["t", "r", "l", "b", "lt", "lb", "rt", "rb"];
const FreeDom = vueDemi.defineComponent({
  name: "FreeDom",
  emits: ["update:customStyle", "select"],
  props: {
    customStyle: {
      type: Object,
      required: true
    },
    scale: [Boolean, Array],
    move: Boolean,
    preview: Boolean,
    limitWidth: {
      type: Number,
      default: void 0
    },
    limitHeight: {
      type: Number,
      default: void 0
    }
  },
  setup(props, { emit }) {
    const active = vueDemi.ref(false);
    const SceneContext = vueDemi.inject(SceneToken);
    const _preview = vueDemi.computed(() => SceneContext?.preview || props.preview);
    const canScale = vueDemi.computed(() => !_preview.value && (SceneContext?.scale || props.scale));
    const canMove = vueDemi.computed(() => !_preview.value && (SceneContext?.move || props.move));
    const widgetRef = vueDemi.shallowRef();
    const _style = vueDemi.ref({});
    const wrapStyle = useNormalizeStyle(_style);
    const uuid$1 = uuid.v4();
    const isScale = vueDemi.ref(false);
    const isMove = vueDemi.ref(false);
    const _rect = vueDemi.reactive({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    const context = {
      _rect,
      trigger
    };
    vueDemi.onMounted(() => {
      SceneContext?.register(uuid$1, context);
    });
    core.onClickOutside(widgetRef, () => {
      active.value = false;
    });
    function normalize(style) {
      const { transform, width, height } = style;
      const { x, y } = getPos(transform);
      _rect.width = parseNum(width ?? 0);
      _rect.height = parseNum(height ?? 0);
      _rect.x = x;
      _rect.y = y;
    }
    function parseNum(val) {
      return typeof val === "number" ? val : parseFloat(val);
    }
    vueDemi.watch(() => props.customStyle, (_style2) => {
      normalize(_style2);
      trigger();
    });
    vueDemi.onMounted(async () => {
      _style.value = props.customStyle;
      await vueDemi.nextTick();
      const rect = widgetRef.value.getBoundingClientRect();
      normalize(props.customStyle);
      _rect.width = rect.width;
      _rect.height = rect.height;
      trigger();
    });
    function trigger() {
      const { x, y, width, height } = _rect;
      _style.value = {
        ...props.customStyle,
        transform: `translate(${x}px, ${y}px)`,
        width,
        height
      };
    }
    const _dots = vueDemi.computed(() => {
      return SceneContext && Array.isArray(SceneContext.scale) ? SceneContext.scale : props.scale;
    });
    const dots = vueDemi.computed(() => {
      if (!isActive.value)
        return [];
      return Array.isArray(_dots.value) ? _dots.value : Dots;
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
      if (isMove.value)
        return;
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
      const move = (mouseEvt) => {
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
        if (!checkValid(_rect))
          return;
        EventBus.emit("move", uuid$1);
        trigger();
      };
      const up = () => {
        isScale.value = false;
        EventBus.emit("moveup", uuid$1);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        emit("update:customStyle", _style.value);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
    function getDotPos(dot) {
      if (!_style.value)
        return {};
      const { width, height } = _style.value;
      const isL = /l/.test(dot);
      const isR = /r/.test(dot);
      const isT = /t/.test(dot);
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
        top: top + "px",
        left: left + "px",
        cursor: dot.split("").reverse().map((item) => direct[item]).join("") + "-resize"
      };
    }
    function onMousedown(evt) {
      evt.stopPropagation();
      if (isScale.value || !canMove.value)
        return;
      isMove.value = true;
      active.value = true;
      const pos = getStyle(_style.value);
      const move = (mouseEvt) => {
        const { clientX, clientY } = mouseEvt;
        const x = clientX - evt.clientX + pos.x;
        const y = clientY - evt.clientY + pos.y;
        _rect.x = x;
        _rect.y = y;
        _rect.width = pos.width;
        _rect.height = pos.height;
        if (!checkValid(_rect))
          return;
        EventBus.emit("move", uuid$1);
        trigger();
      };
      const up = () => {
        isMove.value = false;
        EventBus.emit("moveup", uuid$1);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        emit("update:customStyle", _style.value);
        emit("select", _rect);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
    function checkValid(rect) {
      if (SceneContext) {
        return SceneContext.checkValid(rect);
      } else if (props.limitWidth && props.limitHeight) {
        const { x, y, width, height } = rect;
        return x >= 0 && x + width <= props.limitWidth && y >= 0 && y + height <= props.limitHeight;
      } else {
        return true;
      }
    }
    function getStyle(style) {
      const { transform, width, height } = style;
      const { x, y } = getPos(transform);
      return {
        x: x ? Number(x) : 0,
        y: y ? Number(y) : 0,
        width: parseFloat(width),
        height: parseFloat(height)
      };
    }
    function getPos(transform) {
      if (!transform) {
        return {
          x: 0,
          y: 0
        };
      }
      const posRegexp = /translate\(([.0-9]+)px[, ]+([.0-9]+)px\)/;
      const [, x, y] = posRegexp.exec(transform) ?? [];
      return { x: parseNum(x), y: parseNum(y) };
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
      onMousedownDot
    };
  },
  render() {
    const dots = this.canScale ? this.dots.map((dot) => {
      if (vueDemi.isVue2) {
        return vueDemi.h("div", {
          class: "free-dom__widget-dot",
          style: this.getDotPos(dot),
          on: {
            mousedown: (evt) => this.onMousedownDot(evt, dot)
          }
        });
      }
      return vueDemi.h("div", {
        class: "free-dom__widget-dot",
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
            "free-dom__widget-wrapper",
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
          "free-dom__widget-wrapper",
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

const lineType = ["xt", "xc", "xb", "yl", "yc", "yr"];
var markLine = vueDemi.defineComponent({
  setup() {
    const SceneContext = vueDemi.inject(SceneToken);
    const lines = vueDemi.shallowRef(lineType);
    const diff = vueDemi.ref(SceneContext.diff);
    const nodes = SceneContext.nodes;
    const lineStatus = vueDemi.reactive({
      xt: {
        show: false,
        pos: 0
      },
      xc: {
        show: false,
        pos: 0
      },
      xb: {
        show: false,
        pos: 0
      },
      yl: {
        show: false,
        pos: 0
      },
      yc: {
        show: false,
        pos: 0
      },
      yr: {
        show: false,
        pos: 0
      }
    });
    EventBus.on("move", async (uuid) => {
      const current = nodes.find((node) => node.uuid === uuid)?.node ?? {};
      clearStatus();
      nodes.forEach((node) => {
        if (node.uuid === uuid)
          return;
        const _current = normalize(current._rect);
        const _target = normalize(node.node._rect);
        if (isNearly(_current.top, _target.top)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top
          };
          current._rect.y = _target.top;
        }
        if (isNearly(_current.bottom, _target.top)) {
          lineStatus.xt = {
            show: true,
            pos: _target.top
          };
          current._rect.y = _target.top - _current.height;
        }
        if (isNearly(_current.centerY, _target.centerY)) {
          lineStatus.xc = {
            show: true,
            pos: _target.centerY
          };
          current._rect.y = _target.centerY - _current.height / 2;
        }
        if (isNearly(_current.top, _target.bottom)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom
          };
          current._rect.y = _target.bottom;
        }
        if (isNearly(_current.bottom, _target.bottom)) {
          lineStatus.xb = {
            show: true,
            pos: _target.bottom
          };
          current._rect.y = _target.bottom - _current.height;
        }
        if (isNearly(_current.left, _target.left)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left
          };
          current._rect.x = _target.left;
        }
        if (isNearly(_current.right, _target.left)) {
          lineStatus.yl = {
            show: true,
            pos: _target.left
          };
          current._rect.x = _target.left - _current.width;
        }
        if (isNearly(_current.centerX, _target.centerX)) {
          lineStatus.yc = {
            show: true,
            pos: _target.centerX
          };
          current._rect.x = _target.centerX - _current.width / 2;
        }
        if (isNearly(_current.left, _target.right)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right
          };
          current._rect.x = _target.right;
        }
        if (isNearly(_current.right, _target.right)) {
          lineStatus.yr = {
            show: true,
            pos: _target.right
          };
          current._rect.x = _target.right - _current.width;
        }
      });
    });
    EventBus.on("moveup", clearStatus);
    vueDemi.onBeforeUnmount(() => {
      EventBus.off("move");
      EventBus.off("moveup");
    });
    function clearStatus() {
      lineStatus.xt.show = false;
      lineStatus.xc.show = false;
      lineStatus.xb.show = false;
      lineStatus.yl.show = false;
      lineStatus.yc.show = false;
      lineStatus.yr.show = false;
    }
    function normalize(rect) {
      return {
        top: rect.y,
        bottom: rect.y + rect.height,
        left: rect.x,
        right: rect.x + rect.width,
        width: rect.width,
        height: rect.height,
        centerX: rect.x + rect.width / 2,
        centerY: rect.y + rect.height / 2
      };
    }
    function isNearly(curr, target) {
      return Math.abs(curr - target) <= diff.value;
    }
    return {
      lines,
      diff,
      lineStatus
    };
  },
  render() {
    const _line = (line, info) => vueDemi.h("div", {
      style: { [line.includes("x") ? "top" : "left"]: info.pos + "px" },
      class: [line.includes("x") ? "free-dom__xline" : "free-dom__yline", "free-dom__line"]
    });
    const _lines = this.lines.filter((line) => this.lineStatus[line].show).map((line) => _line(line, this.lineStatus[line]));
    return vueDemi.h("div", {
      class: "free-dom__mark-line"
    }, _lines);
  }
});

const freeDomWrapProps = {
  preview: Boolean,
  move: Boolean,
  scale: [Boolean, Array],
  diff: {
    type: Number,
    default: 3
  }
};
const FreeDomWrap = vueDemi.defineComponent({
  name: "FreeDomWrap",
  props: freeDomWrapProps,
  setup(props) {
    const rectRef = vueDemi.shallowRef(null);
    const rect = core.useElementBounding(rectRef);
    const nodes = vueDemi.ref([]);
    function register(uuid, node) {
      nodes.value.push({ uuid, node });
    }
    function checkValid(pos) {
      const { x, y, width, height } = pos;
      return x >= 0 && x + width <= rect.width.value && y >= 0 && y + height <= rect.height.value;
    }
    vueDemi.provide(
      SceneToken,
      vueDemi.reactive({
        ...vueDemi.toRefs(props),
        nodes,
        register,
        checkValid
      })
    );
    return {
      rectRef
    };
  },
  render() {
    const defaultSlot = typeof this.$slots.default === "function" ? this.$slots.default() : this.$slots.default;
    return vueDemi.h("section", {
      ref: "rectRef"
    }, [defaultSlot, vueDemi.h(markLine)]);
  }
});

const freeDom = FreeDom;
const freeScene = FreeDomWrap;

exports.freeDom = freeDom;
exports.freeScene = freeScene;
