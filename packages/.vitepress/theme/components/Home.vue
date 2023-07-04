<template>
  <pre>{{ layout }}</pre>
  <FreeDom>
    <Test />
    <span>a</span>
  </FreeDom>
</template>

<script lang="ts" setup>
import Test from './Test.vue'
import { FreeDom, gridLayout } from 'free-dom'
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
