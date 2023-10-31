<template>
  <section style="transform: scale(0.5);">
    <FreeDom
      :transform-scale="0.5"
      @update:model-value="pos = $event"
    >
      <pre>{{ pos }}</pre>
    </FreeDom>
  </section>
</template>

<script lang="ts" setup>
import { FreeDom } from 'free-dom'
import { ref } from 'vue'

const pos = ref({})
</script>
