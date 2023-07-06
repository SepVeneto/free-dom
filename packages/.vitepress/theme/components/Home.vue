<template>
  <pre>{{ layout }}</pre>
  <FreeScene style="width: 1000px; height: 500px; border: 1px solid black; position: relative;">
    <FreeDom
      :width="100"
      :height="100"
      lock-aspect-ratio
    >
      <Test />
    </FreeDom>
    <FreeDom
      :width="100"
      :height="100"
    >
      <span>a</span>
    </FreeDom>
  </FreeScene>
</template>

<script lang="ts" setup>
import Test from './Test.vue'
import { FreeDom, FreeScene, gridLayout } from 'free-dom'
import 'free-dom/style/index.scss'
import { ref } from 'vue'

defineOptions({
  name: 'HomePage',
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
