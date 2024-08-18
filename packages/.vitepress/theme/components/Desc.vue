<template>
  <span style="display: flex; align-items: center;">
    <slot />
    <ElTooltip
      effect="dark"
      :content="desc"
      raw-content
      trigger="click"
    >
      <ElIcon
        :size="16"
        style="margin-left: 10px;"
      >
        <IconWarning />
      </ElIcon>
    </ElTooltip>
  </span>
</template>

<script setup lang="ts">
import { ElIcon, ElTooltip } from 'element-plus'
import { Warning as IconWarning } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-popper.css'
import 'element-plus/theme-chalk/base.css'

defineProps({
  desc: {
    type: String,
    required: true,
  },
})
</script>
