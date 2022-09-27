<template>
  <section
    style="
      width: 600px;
      height: 400px;
      border: 1px solid #999;
      position: relative;
    "
  >
    <free-dom v-model:custom-style="style1" move scale>
      <div>测试文本1</div>
    </free-dom>
    <free-dom v-model:custom-style="style2" move scale active>
      <div>测试文本2</div>
    </free-dom>
  </section>
</template>

<script lang="ts" setup>
import { freeDom, freeScene } from 'free-dom';
import 'free-dom/../style.scss';
import { ref } from 'vue-demi';
const style1 = ref({});
const style2 = ref({ fontSize: '24px' })

</script>
