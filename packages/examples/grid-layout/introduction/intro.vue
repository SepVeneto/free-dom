<template>
  <GridLayout
    v-model="layout"
    :width="375"
    :cols="375"
    :row-height="1"
    :margin="[0, 0]"
  >
    <span
      key="a"
      class="grid-item"
    >a</span>
    <span
      key="b"
      class="grid-item"
    >b</span>
  </GridLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GridLayout } from 'free-dom'

defineOptions({
  name: 'GridLayoutIntro',
})

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 300, h: 150 },
  { i: 'b', x: 0, y: 0, w: 300, h: 150 },
])
</script>
