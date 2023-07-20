<template>
  <section
    ref="wrapRef"
    style="width: 100%;"
  >
    <ClientOnly>
      <component
        :is="demo"
        v-if="demo"
        :style="wrapStyle"
        :width="width"
      />
    </ClientOnly>
  </section>
  <slot name="source" />
</template>

<script lang="ts" setup>
import { useWidth } from '../hooks'
import { computed, ref } from 'vue'

const wrapRef = ref<HTMLElement>()
const width = useWidth(wrapRef)

const props = defineProps<{
  source: string,
  demos: Record<string, any>,
  path: string,
}>()
const isGridLayout = computed(() => props.path.startsWith('grid-layout'))
const wrapStyle = computed(() => {
  return {
    border: '1px solid black',
    width: isGridLayout.value ? '' : '100%',
    height: isGridLayout.value ? '' : '300px',
  }
})
const demo = computed(() => {
  const keys = Object.keys(props.demos)
  for (const k of keys) {
    const p = k.replace('../examples/', '').replace('.vue', '')
    if (p === props.path) {
      console.log(props.demos[k].default, props.path)
      return props.demos[k].default
    }
  }
  return false
})
</script>

<style>
.grid-item {
  background: #ddd;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
