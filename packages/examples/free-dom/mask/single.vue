<template>
  <section>
    <FreeDom @update:model-value="pos = $event" :mask="false">
      <div style="color: #fff; width: 100%; height: 100%; background: crimson;">长文本长文本长文本长文本长文本长文本长文本长文本</div>
    </FreeDom>
    <FreeDom :auto-size="false">
      <div>长文本长文本长文本长文本长文本长文本长文本长文本</div>
    </FreeDom>
  </section>
</template>

<script lang="ts" setup>
import { FreeDom } from 'free-dom'
import { ref } from 'vue'

const pos = ref({})
</script>
