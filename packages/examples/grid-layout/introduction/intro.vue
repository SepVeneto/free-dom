<template>
  <GridLayout
    v-model="layout"
    collision
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GridLayout } from 'free-dom'

defineOptions({
  name: 'GridLayoutIntro',
})

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2 },
  { i: 'c', x: 2, y: 0, w: 1, h: 2 },
])
</script>
