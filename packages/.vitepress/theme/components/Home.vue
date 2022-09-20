<template>
  <section style="width: 600px; height: 400px; border: 1px solid #999; position: relative;">
    <wrapper
      v-model:custom-style="style"
      move
      scale
    >
      <div>测试文本</div>
    </wrapper>
  </section>
</template>

<script lang="ts" setup>
import wrapper from 'free-dom'
import { ref, watch } from 'vue-demi'
const style = ref({})
watch(style, (val) => {
  console.log(val)
}, { deep: true })
</script>