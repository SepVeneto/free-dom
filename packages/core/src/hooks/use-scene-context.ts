import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { computed, inject, onMounted } from 'vue-demi'
import type { INodeInfo, IPos } from '../components/freeDomWrap'
import type { FreeDomProps } from '../components/freeDom'

let id = 0

export function useSceneContext(context: INodeInfo, props: FreeDomProps) {
  const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
  const uuid = id++
  const lockAspectRatio = computed(() => SceneContext?.lockAspectRatio || props.lockAspectRatio)
  const minWidth = computed(() => SceneContext?.minWidth || props.minWidth)
  const minHeight = computed(() => SceneContext?.minHeight || props.minHeight)
  const disabledDrag = computed(() => SceneContext?.disabledDrag || props.disabledDrag)
  const disabledResize = computed(() => SceneContext?.disabledResize || props.disabledResize)
  const scale = computed(() => SceneContext?.scale || props.scale)
  const fixNonMonospaced = computed(() => {
    return SceneContext?.fixNonMonospaced || props.fixNonMonospaced
  })

  onMounted(() => {
    SceneContext?.register(uuid, context)
  })

  function check(pos: IPos) {
    if (!SceneContext) return true
    return SceneContext.checkValid(pos)
  }

  return {
    emit: (name: string) => SceneContext?.emit(name, uuid),
    check,
    width: SceneContext?.width,
    height: SceneContext?.height,

    scale,
    lockAspectRatio,
    minWidth,
    minHeight,
    disabledDrag,
    disabledResize,
    fixNonMonospaced,
  }
}
