<template>
  <FreeScene
    keyboard
    @batch-select="onBatchselect"
  >
    <FreeDom v-model="pos1">
      测试文本1
      测试文本1
    </FreeDom>
    <FreeDom v-model="pos2">
      测试文本2
    </FreeDom>
    <FreeDom>
      测试文本3
    </FreeDom>

    <FreeDom
      v-for="(area, index) in areas"
      :key="area.i"
      v-model="areas[index]"
    />
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref, shallowRef } from 'vue'

const areas = shallowRef([])
const pos1 = ref({
  x: 100,
  y: 100,
})
const pos2 = ref({
  x: 300,
  y: 200,
})
function onBatchselect(pos) {
  console.log(pos)
  const { lastX, lastY, startX, startY } = pos
  areas.value.push({
    i: Date.now(),
    x: startX,
    y: startY,
    w: Math.abs(lastX - startX),
    h: Math.abs(lastY - startY),
  })
}
</script>
