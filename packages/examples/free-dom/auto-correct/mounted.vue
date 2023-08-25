<template>
  <FreeScene>
    <FreeDom
      v-model="pos"
      :scale="['rb']"
      style="background: crimson;"
    >
      <pre>{{ pos }}</pre>
    </FreeDom>
  </FreeScene>
</template>

<script lang="ts" setup>
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'

const pos = ref({
  x: -20,
  y: 280,
})
</script>
