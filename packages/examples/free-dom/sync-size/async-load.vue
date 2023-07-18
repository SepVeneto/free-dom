<template>
  <section>
    <FreeDom
      ref="domCloseRef"
      :auto-size="false"
      @update:model-value="pos = $event"
    >
      <span>关闭自动计算</span>
      <img
        ref="imgRef"
        draggable="false"
        src="https://th.bing.com/th/id/OIP.0-UL9rX37JofuquE90BSjgAAAA?w=197&h=180&c=7&r=0&o=5&pid=1.7"
        @load="handleImageLoad"
      >
    </FreeDom>
    <FreeDom
      ref="domRef"
      :model-value="{ x: 300 }"
      @update:model-value="pos = $event"
    >
      <span>自动计算</span>
      <img
        ref="imgRef"
        src="https://th.bing.com/th/id/OIP.0-UL9rX37JofuquE90BSjgAAAA?w=197&h=180&c=7&r=0&o=5&pid=1.7"
        draggable="false"
        @load="handleImageLoad"
      >
    </FreeDom>
  </section>
</template>

<script lang="ts" setup>
import { FreeDom } from 'free-dom'
import { ref } from 'vue'

const domRef = ref<InstanceType<typeof FreeDom>>()
const domCloseRef = ref<InstanceType<typeof FreeDom>>()
const pos = ref({})

function handleImageLoad() {
  domRef.value.syncSize()
  domCloseRef.value.syncSize()
}
</script>
