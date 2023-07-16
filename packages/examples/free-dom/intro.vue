<template>
  <FreeScene
    :width="500"
    :height="500"
  >
    <FreeDom v-model="pos1">
      <span>测试文本1</span>
    </FreeDom>
    <FreeDom v-model="pos2">
      <span style="font-size: 32px;">测试文本2</span>
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'

const pos1 = ref({})
const pos2 = ref({})
</script>
