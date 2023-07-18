<template>
  <ClientOnly>
    <component
      :is="demo"
      v-if="demo"
      style="border: 1px solid black; width: 100%; height: 500px;"
    />
    <slot name="source" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  source: string,
  demos: Record<string, any>,
  path: string,
}>()
const demo = computed(() => {
  const keys = Object.keys(props.demos)
  console.log(keys)
  for (const k of keys) {
    console.log(k)
    const p = k.replace('../examples/', '').replace('.vue', '')
    if (p === props.path) {
      return props.demos[k].default
    }
  }
  return false
})
</script>
