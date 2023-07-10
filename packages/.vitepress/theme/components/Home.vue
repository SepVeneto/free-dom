<template>
  <pre>{{ layout }}</pre>
  <!-- <pre>{{ demo }}</pre> -->

  <GridLayout
    v-model="layout"
    style="position: relative; height: 200px;"
  >
    <span key="a">a</span>
    <span key="b">b</span>
    <span key="c">c</span>
  </GridLayout>
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

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
])
</script>

<style>
.vp-doc {
  position: static !important;
}
</style>
