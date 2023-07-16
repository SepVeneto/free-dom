<template>
  <ClientOnly>
    <component
      :is="demo"
      v-if="demo"
    />
    <div class="language-vue">
      <button
        title="Copy Code"
        class="copy"
      /><span class="lang">vue</span>
      {{ decodeURIComponent(source) }}
    </div>
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
  for (const k of keys) {
    const p = k.replace('../examples/', '').replace('.vue', '')
    if (p === props.path) {
      return props.demos[k].default
    }
  }
  return false
})
</script>
