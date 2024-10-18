<template>
  <div style="display: flex;">
    <aside style="padding: 10px; width: 140px;">
      <div
        id="option1"
        class="option"
        draggable="true"
        @dragstart="onDragstart"
      >
        备选项一
      </div>
      <div
        id="option2"
        class="option"
        draggable="true"
        @dragstart="onDragstart"
      >
        备选项二
      </div>
      <div
        id="option3"
        class="option"
        draggable="true"
        @dragstart="onDragstart"
      >
        备选项三
      </div>
    </aside>
    <FreeScene
      style="border: 1px dashed #999; width: calc(100% - 140px);"
      @drop="onDrop"
    >
      <FreeDom
        v-for="item in list"
        :key="item.key"
        v-model="item.pos"
      >
        <component :is="item.render" />
      </FreeDom>
    </FreeScene>
  </div>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { h, ref } from 'vue'
const pos1 = ref({
  key: 1,
  pos: {
    x: Math.random() * 100,
    y: Math.random() * 100,
  },
  render: h('span', '测试文本1'),
})
const pos2 = ref({
  key: 2,
  pos: {
    x: Math.random() * 100 + 100,
    y: Math.random() * 100 + 100,
  },
  render: h('span', '测试文本1'),
})

const list = ref([pos1.value, pos2.value])

function onDrop(evt: DragEvent) {
  list.value.push({
    key: 3,
    pos: {
      x: evt.layerX,
      y: evt.layerY,
    },
    render: h('span', { innerHTML: evt.dataTransfer?.getData('text/plain') }),
  })
}
function onDragstart(evt: DragEvent) {
  evt.dataTransfer?.setData('text/plain', (evt.target as HTMLElement).innerHTML)
}
</script>

<style scoped lang="scss">
.option {
  padding: 10px;
  cursor: move;
}
</style>
