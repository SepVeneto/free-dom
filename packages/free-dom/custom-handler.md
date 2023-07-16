---
title: 自定义缩放操作点
lang: zh-CN
---

# 自定义缩放操作点
<section>
  <div>x: {{pos.x}}</div>
  <div>y: {{pos.y}}</div>
  <div>width: {{pos.w}}</div>
  <div>height: {{pos.h}}</div>
  <FreeScene
    style="width: 100%; height: 500px; border: 1px solid black;"
  >
    <FreeDom
      v-model="pos"
      handle
      style="border: 1px solid #ddd;"
    >
      <span>text</span>
      <template #handler="axis">
        <i class="custom-handler" :class="`custom-handler--${axis}`" />
      </template>
    </FreeDom>
  </FreeScene>
</section>

<script setup>
import { FreeDom, FreeScene } from '../core/src'
import { ref, reactive } from 'vue'

const x = ref(0)
const y = ref(0)
const width = ref(100)
const height = ref(100)
const pos = ref({x: 0, y: 0})
</script>

<style lang="scss">
.custom-handler {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4089ef;
  &--t {
    top: -4px;
    left: 50%;
    margin-left: -4px;
    cursor: ns-resize;
  }
  &--l {
    top: 50%;
    left: -4px;
    cursor: ew-resize;
  }
  &--r {
    top: 50%;
    right: -4px;
    cursor: ew-resize;
  }
  &--b {
    left: 50%;
    bottom: -4px;
    margin-left: -4px;
    cursor: ns-resize;
  }
  &--lt {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
  }
  &--lb {
    bottom: -4px;
    left: -4px;
    cursor: ne-resize;
  }
  &--rt {
    top: -4px;
    right: -4px;
    cursor: sw-resize;
  }
  &--rb {
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
  }
}
</style>
