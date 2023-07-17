<template>
  <FreeScene>
    <FreeDom v-model="pos1">
      <span>测试文本1</span>
      <span>测试文本1</span>
    </FreeDom>
    <FreeDom v-model="pos2">
      <div
        style="font-size: 32px; line-height: 32px;"
      >
        测试文本2
      </div>
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'

const pos1 = ref({})
const pos2 = ref({
  x: 100,
})
</script>
