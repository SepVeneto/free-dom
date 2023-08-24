<template>
  <FreeScene handle=".drag-operate">
    <FreeDom v-model="pos1">
      <div>
        <div style="display: flex; justify-content: center; align-items: center; min-width: 64px; min-height: 64px;">
          <i
            class="drag-operate"
            style="padding: 10px; background: #d9d9d9;"
          >x</i>
        </div>
      </div>
    </FreeDom>
    <FreeDom v-model="pos2">
      <div>
        <div style="display: flex; justify-content: center; align-items: center; min-width: 64px; min-height: 64px;">
          <i
            class="drag-operate"
            style="padding: 10px; background: #d9d9d9;"
          >x</i>
        </div>
      </div>
    </FreeDom>
  </FreeScene>
</template>

<script setup lang="ts">
import { FreeDom, FreeScene } from 'free-dom'
import { ref } from 'vue'
const pos1 = ref({
  x: Math.random() * 100,
  y: Math.random() * 100,
})
const pos2 = ref({
  x: Math.random() * 100 + 100,
  y: Math.random() * 100 + 100,
})
</script>
