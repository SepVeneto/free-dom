import { computed, ref } from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { INode } from '../types'

type Operate = any
const records = ref<Operate>([])
const state = ref({
  canClear: false,
})

export function useOperateHistory(nodes: Ref<INode[]>) {
  const lastOperate = computed(() => records.value.slice(-1)[0]?.type)

  function push(operate: Operate) {
    records.value.push({
      ...operate,
      data: nodes,
    })
  }

  return {
    state,
    records,
    lastOperate,
    push,
  }
}
