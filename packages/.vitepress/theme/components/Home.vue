<template>
  <div style="display: flex; width: 1200px;">
    <pre style="flex-basis: 200px; flex-shrink: 0;">{{ layout }}</pre>
    <!-- <pre>{{ demo }}</pre> -->

    <GridLayout
      v-model="layout"
      :width="width"
      collision
      style="flex: 1; background: #ddd;"
    >
      <span
        key="a"
        class="grid-item"
      >a</span>
      <span
        key="b"
        class="grid-item"
      >b</span>
      <span
        key="c"
        class="grid-item"
      >c</span>
    </GridLayout>
  </div>
  <FreeScene style="width: 1000px; height: 500px; border: 1px solid black; position: relative;">
    <FreeDom
      :width="100"
      :height="100"
      lock-aspect-ratio
    >
      <Test />
    </FreeDom>
    <FreeDom
      v-model:x="demo.x"
      v-model:y="demo.y"
      v-model:width="demo.width"
      v-model:height="demo.height"
    >
      <span>a</span>
    </FreeDom>
  </FreeScene>
</template>

<script lang="ts" setup>
import Test from './Test.vue'
import { FreeDom, FreeScene, GridLayout } from 'free-dom'
import 'free-dom/style/index.scss'
import { ref } from 'vue'

defineOptions({
  name: 'HomePage',
})

const demo = ref({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
})
const width = ref(1000)

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, static: true },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
])
</script>

<style>
.vp-doc {
  position: static !important;
}
.grid-item {
  background: #fff;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
