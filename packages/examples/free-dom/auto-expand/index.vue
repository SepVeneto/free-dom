<template>
  <div>
    <div style="position: absolute;">
      <div>width: <input type="number" v-model="width"></div>
      <div>height: <input type="number" v-model="height"></div>
    </div>
    <FreeScene
      :auto-expand="10"
      v-model:width="width"
      v-model:height="height"
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
  </div>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'

const width = ref(500)
const height = ref(300)
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
