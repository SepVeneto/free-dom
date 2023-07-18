<template>
  <section>
    <FreeDom
      v-model="pos"
      handle
      style="border: 1px solid #ddd;"
    >
      <span>text</span>
      <template #handler="axis">
        <i
          class="custom-handler"
          :class="`custom-handler--${axis}`"
        />
      </template>
    </FreeDom>
  </section>
</template>

<script setup lang="ts">
import { FreeDom } from 'free-dom'
import { ref } from 'vue'

const pos = ref({})
</script>

<style lang="scss">
.custom-handler {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4089ef;
  &--t {
    top: -4px;
    left: 50%;
    margin-left: -4px;
    cursor: ns-resize;
  }
  &--l {
    top: 50%;
    margin-top: -4px;
    left: -4px;
    cursor: ew-resize;
  }
  &--r {
    top: 50%;
    margin-top: -4px;
    right: -4px;
    cursor: ew-resize;
  }
  &--b {
    left: 50%;
    bottom: -4px;
    margin-left: -4px;
    cursor: ns-resize;
  }
  &--lt {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
  }
  &--lb {
    bottom: -4px;
    left: -4px;
    cursor: ne-resize;
  }
  &--rt {
    top: -4px;
    right: -4px;
    cursor: sw-resize;
  }
  &--rb {
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
  }
}
</style>
