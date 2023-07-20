<template>
  <GridLayout
    v-model="layout"
  >
    <span
      key="a"
      class="grid-item"
    >a</span>
    <span
      key="b"
      class="grid-item"
    >static-b</span>
    <span
      key="c"
      class="grid-item"
    >c</span>
  </GridLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GridLayout } from 'free-dom'

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, static: true },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
])
</script>
