<template>
  <section style="display: flex;">
    <VueDraggable
      v-model="list"
      style="flex: 1"
      item-key="i"
    >
      <template #item="{ element }">
        <div
          class="grid-item"
          style="width: 50px; height: 50px;"
        >
          {{ element.i }}
        </div>
      </template>
    </VueDraggable>
    <div>
      {{ layout }}
      <div style="border: 1px solid #ddd; width: 500px;">
        <GridLayout
          v-model="layout"
          collision
          :width="500"
          droppable
          @drop-item="onDropItem"
        >
          <span
            v-for="item in layout"
            :key="item.i"
            class="grid-item"
          >{{ item.i }}</span>
        </GridLayout>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import VueDraggable from 'vuedraggable'
import { ref } from 'vue'
import { GridLayout } from 'free-dom'

const layout = ref([
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2 },
  { i: 'c', x: 2, y: 0, w: 1, h: 2 },
])
const list = ref([{ i: 'd' }, { i: 'e' }])

function onDropItem(item) {
  const { x, y, w, h } = item
  layout.value.push({ i: 'd' + layout.value.length, x, y, w, h })
}
</script>
