<template>
  <section
    ref="wrapRef"
    style="width: 100%;"
  >
    <ClientOnly>
      <component
        :is="demo"
        :class="isGridLayout ? 'grid-wrap' : 'free-wrap'"
        v-if="demo"
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

<style>
.free-wrap {
  width: 100%;
  height: 300px;
  border: 1px solid black;
  overflow: auto;
}
.grid-wrap {
  border: 1px solid black;
}
.grid-item {
  background: #ddd;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
