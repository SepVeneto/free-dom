<template>
  <section
    ref="widgetRef"
    :class="['widget-wrapper', {'can-move': _move}]"
    :style="wrapStyle"
    @mousedown="onMousedown"
  >
    <template v-if="_scale">
      <div
        v-for="(dot, index) in dots"
        :key="index"
        class="widget-dot"
        :style="getDotPos(dot)"
        @mousedown="onMousedownDot($event, dot)"
      ></div>
    </template>
    <div>
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { CSSProperties, nextTick, onMounted, PropType, watch, watchEffect } from 'vue-demi'
import { computed, shallowRef, inject, ref } from 'vue-demi'
import { onClickOutside, useElementBounding, useEventListener } from '@vueuse/core'
import { useNormalizeStyle } from './hooks';
const emit = defineEmits(['update:customStyle'])
const props = defineProps({
  customStyle: {
    type: Object as PropType<CSSProperties>,
    required: true,
  },
  scale: Boolean,
  move: Boolean,
  // element: {
  //   type: Object as PropType<ComponentData>,
  //   required: true,
  // }
})
const editorContext = inject('Editor', { preview: false })
const _preview = computed(() => editorContext.preview)
const _scale = computed(() => !_preview.value && props.scale)
const _move = computed(() => !_preview.value && props.move)
const widgetRef = shallowRef()
const rect = useElementBounding(widgetRef)
const _style = ref<Partial<CSSProperties>>({})
const wrapStyle = useNormalizeStyle(_style)

// watch(() => rect, async () => {
//   normalizeCustomStyle()
//   // normalizeCustomStyle()
//   console.log(rect.width, rect.height)
// }, { deep: true })


onMounted(() => {
  normalizeCustomStyle()
})

async function normalizeCustomStyle() {
  const { width, height } = props.customStyle
  let _width = width;
  let _height = height;
  // if (!_width) {
  //   _width = rect.width.value
  // }
  // if(!_height) {
  //   _height = rect.height.value
  // }
  _style.value = {
    transform: 'translate(0, 0)',
    ...props.customStyle,
  }
  await nextTick()
  _height = parseFloat(getComputedStyle(widgetRef.value).height)
  _width = parseFloat(getComputedStyle(widgetRef.value).width)
  _style.value = {
    ...props.customStyle,
    width: _width,
    height: _height,
  }
}

onClickOutside(widgetRef, () => {
  // console.log('outside')
})

const dots = computed(() => {
  return isActive.value ? ['t', 'r', 'l', 'b', 'lt' ,'lb', 'rt', 'rb'] : []
})
const direct = {
  l: 'w',
  r: 'e',
  t: 'n',
  b: 's',
}
const isActive = shallowRef(true)
// const isActive = computed(() => {
//   return componentData.current === props.element
// })

function onMousedownDot(evt: MouseEvent, dot: string) {
  evt.stopPropagation()
  evt.preventDefault()

  const { x, y, width, height } = getPos(_style.value)
  const cWidth = width ?? rect.width
  const cHeight = height ?? rect.height

  const startX = evt.clientX
  const startY = evt.clientY

  const isT = /t/.test(dot)
  const isL = /l/.test(dot)
  const isB = /b/.test(dot)
  const isR = /r/.test(dot)

  const move = (mouseEvt: MouseEvent) => {
    const currX = mouseEvt.clientX
    const currY = mouseEvt.clientY
    const deltaX = currX - startX
    const deltaY = currY - startY
    const newWidth = cWidth + (isL ? -deltaX : isR ? deltaX : 0)
    const newHeight = cHeight + (isT ? -deltaY : isB ? deltaY : 0)
    const pos = {
      x: x as number + (isL ? deltaX : 0),
      y: y as number + (isT ? deltaY : 0),
      width: newWidth < 0 ? 0 : newWidth,
      height: newHeight < 0 ? 0 : newHeight
    }
    setPosition(pos)
    // componentData.setPosition(pos)
  }
  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    emit('update:customStyle', _style.value)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
function setPosition(pos: { x: number, y: number, width: number, height: number }) {
  _style.value = {
    ...props.customStyle,
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    width: pos.width,
    height: pos.height,
  }
  // emit('update:customStyle', {
  //   ...props.customStyle,
  //   transform: `translate(${pos.x}px, ${pos.y}px)`,
  //   width: pos.width,
  //   height: pos.height,
  // })
}
function getDotPos(dot: string): CSSProperties {
  if (!_style.value) return {}
  const { width, height } = _style.value
  const isL = /l/.test(dot)
  const isR = /r/.test(dot)
  const isT = /t/.test(dot)
  const isB = /b/.test(dot)

  let left, top;

  if (dot.length === 2) {
    left = isL ? 0 : width
    top = isT ? 0 : height
  } else {
    if (isL || isR) {
      left = isL ? 0 : width
      top = Number(height) / 2
    } else {
      left = Number(width) / 2
      top = isT ? 0 : height
    }
  }
  return {
    marginLeft: '-2px',
    marginTop: '-2px',
    top: top + 'px',
    left: left + 'px',
    cursor: dot.split('').reverse().map(item => direct[item as keyof typeof direct]).join('') + '-resize'
  }
}
// useEventListener('mousedown', (evt: MouseEvent) => {
//   console.log(evt.clientX, evt.clientY)
// })
function onMousedown(evt: MouseEvent) {
  evt.stopPropagation()
  if (!_move.value) return;
  // componentData.current = props.element
  const pos = getPos(_style.value)
  const move = (mouseEvt: MouseEvent) => {
    // console.log('drag', 'move')
    const { clientX, clientY } = mouseEvt
    setPosition({
      ...pos,
      x: clientX - evt.clientX + Number(pos.x),
      y: clientY - evt.clientY + Number(pos.y),
    })
  }
  const up = () => {
    // console.log('drag', 'up')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    emit('update:customStyle', _style.value)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
function getPos(style: CSSProperties) {
  const { transform, width, height } = style
  const posRegexp = /translate\((\d+)px[, ]+(\d+)px\)/
  const [, x, y] = posRegexp.exec(transform!) ?? []
  // console.log('getPos', x, y)
  return {
    x: x == null ? Number(x) : Number(width) / 2,
    y: y == null ? Number(y) : Number(height) / 2,
    width: parseFloat(width as string),
    height: parseFloat(height as string)
  }
}
</script>

<style scoped lang="scss">
.widget-wrapper {
  display: inline-block;
  position: absolute;
  border: 1px dashed transparent;
  transition: border-color 0.3s;
  &.can-move:hover {
    border: 1px dashed#4089ef;
    cursor: move;
  }
  &:hover {
    .widget-dot {
      opacity: 1;
    }
  }
}
.widget-dot {
  opacity: 0;
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1px solid #4089ef;
}
</style>