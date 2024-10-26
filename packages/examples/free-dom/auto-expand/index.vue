<template>
  <FreeScene
    auto-expand
  >
    <FreeDom
      v-model="pos1"
      :active="active"
    >
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

const active = ref(false)
const pos1 = ref({
  x: Math.random() * 100,
  y: Math.random() * 100,
})
const pos2 = ref({
  x: Math.random() * 100 + 100,
  y: Math.random() * 100 + 100,
})
</script>
