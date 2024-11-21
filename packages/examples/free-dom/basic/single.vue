<template>
  <section>
    <FreeDom @update:model-value="pos = $event">
      <div>长文本长文本长文本长文本长文本长文本长文本长文本</div>
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
