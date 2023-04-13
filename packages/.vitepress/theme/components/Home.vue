<template>
  <button @click="handleAdd">
    添加
  </button>
  <button
    style="margin-left: 20px"
    @click="handlePreview"
  >
    {{ !preview ? '隐藏' : '显示' }}
  </button>
  <template v-if="!preview">
    <free-scene
      move
      scale
      style="
        width: 600px;
        height: 400px;
        border: 1px solid #999;
        position: relative;
      "
    >
      <free-dom
        v-for="(item, index) in domList"
        :key="index"
        v-model:x="item.x"
        v-model:y="item.y"
        v-model:width="item.width"
        v-model:height="item.height"
        :scale="['rb']"
        :style="item.style"
        handler="mark"
        @select="handleSelect"
      >
        <span>{{ item.text }}{{ index }}</span>
      </free-dom>
    </free-scene>
    <pre>{{ domList }}</pre>
  </template>
</template>

<script lang="ts" setup>
import { freeDom, freeScene } from 'free-dom';
import 'free-dom/index.css';
import { CSSProperties, ref } from 'vue-demi';
type Dom = {
  text: string
  x?: number
  y?: number
  width?: number
  height?: number
  style?: CSSProperties
}
const preview = ref(false);
const domList = ref<Dom[]>([
  {
    text: '测试文本',
    x: 50,
    style: { color: '#d1239d' },
  },
  {
    text: '测试文本',
    style: { fontSize: '24px' },
  },
]);

function handlePreview () {
  preview.value = !preview.value;
}
function handleAdd () {
  domList.value.push({ text: '测试文本', style: {} });
}
function handleSelect (data: any) {
  console.log(data);
}
</script>
