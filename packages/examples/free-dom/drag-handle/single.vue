<template>
  <section>
    <FreeDom
      handle=".drag-operate"
      @update:model-value="pos = $event"
    >
      <div>
        <div style="display: flex; justify-content: center; align-items: center; min-width: 64px; min-height: 64px;">
          <i
            class="drag-operate"
            style="padding: 10px; background: #d9d9d9;"
          >x</i>
        </div>
      </div>
    </FreeDom>
  </section>
</template>

<script lang="ts" setup>
import { FreeDom } from 'free-dom'
import { ref } from 'vue'

const pos = ref({})
</script>
