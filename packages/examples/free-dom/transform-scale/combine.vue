<template>
  <FreeScene
    :transform-scale="1.5"
    style="transform: scale(1.5); transform-origin: top left; overflow: hidden;"
  >
    <FreeDom v-model="pos1">
      测试文本1
    </FreeDom>
    <FreeDom v-model="pos2">
      测试文本2
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'
const pos1 = ref({
  x: Math.random() * 100,
  y: Math.random() * 100,
  w: 200,
  h: 200
})
const pos2 = ref({
  x: Math.random() * 100 + 100,
  y: Math.random() * 100 + 100,
})
</script>
