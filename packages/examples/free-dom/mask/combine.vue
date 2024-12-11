<template>
  <FreeScene :mask="false">
    <FreeDom
      mask
      v-model:w="pos1.width"
      v-model:h="pos1.height"
      v-model:x="pos1.x"
      v-model:y="pos1.y"
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
const pos1 = ref({
  width: 200,
  height: 100,
  x: Math.random() * 100,
  y: Math.random() * 100,
})
const pos2 = ref({
  x: Math.random() * 100 + 100,
  y: Math.random() * 100 + 100,
})
</script>
