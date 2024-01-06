<template>
  <FreeScene
    :diff="10"
    keyboard
  >
    <FreeDom v-model="pos1">
      测试文本1
    </FreeDom>
    <FreeDom
      v-model="pos2"
    >
      {{ pos2 }}
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'
const pos1 = ref({
  x: Math.random() * 100,
  y: Math.random() * 100,
})
const pos2 = ref({
  x: Math.random() * 100 + 100,
  y: Math.random() * 100 + 100,
})
</script>
