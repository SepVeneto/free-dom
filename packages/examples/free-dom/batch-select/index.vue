<template>
  <FreeScene>
    <FreeDom v-model="pos1">
      测试文本1
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
  x: 100,
  y: 100,
})
const pos2 = ref({
  x: 300,
  y: 200,
})
</script>
