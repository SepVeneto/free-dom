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
      :scale="['lt', 'lb', 'rt', 'rb']"
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
        v-model:custom-style="item.style"
        @select="handleSelect"
      >
        <span>{{ item.text }}{{ index }}</span>
      </free-dom>
    </free-scene>
  </template>
</template>

<script lang="ts" setup>
import { freeDom, freeScene } from 'free-dom';
import 'free-dom/index.css';
import { ref } from 'vue-demi';
const preview = ref(false);
const domList = ref([
  {
    text: '测试文本',
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
