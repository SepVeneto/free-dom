<template>
  <FreeScene>
    <button
      style="position: absolute;"
      @click="handleAdd"
    >
      add
    </button>
    <FreeDom
      v-for="(node, index) in nodeList"
      :key="node.stamp"
      v-model="nodeList[index].pos"
      style="border: 1px solid #ddd;"
    >
      <span>{{ node.stamp }}</span>
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'

const nodeList = ref<any[]>([])
function handleAdd() {
  nodeList.value.push({
    stamp: Date.now(),
    pos: {
      x: -20,
      y: 280,
      w: 1000,
      h: 1000,
    },
  })
}
</script>
