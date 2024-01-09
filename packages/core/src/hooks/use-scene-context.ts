import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { computed, inject, onMounted, onUnmounted } from 'vue-demi'
import type { INode, IPos } from '../types'
import type { FreeDomProps } from '../components/freeDom'

let id = 0

export function useSceneContext(context: INode['node'], props: FreeDomProps) {
  const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
  const uuid = id++
  const handle = computed(() => SceneContext?.handle || props.handle)
  const lockAspectRatio = computed(() => SceneContext?.lockAspectRatio || props.lockAspectRatio)
  const minWidth = computed(() => SceneContext?.minWidth || props.minWidth)
  const minHeight = computed(() => SceneContext?.minHeight || props.minHeight)
  const disabledDrag = computed(() => SceneContext?.disabledDrag || props.disabledDrag)
  const disabledResize = computed(() => SceneContext?.disabledResize || props.disabledResize)
  const scale = computed(() => SceneContext?.scale || props.scale)
  const transformScale = computed(() => SceneContext?.transformScale || props.transformScale)
  const fixNonMonospaced = computed(() => {
    return SceneContext?.fixNonMonospaced || props.fixNonMonospaced
  })
  const keyboard = computed(() => SceneContext?.keyboard || props.keyboard)

  onMounted(() => {
    SceneContext?.register(uuid, context)
  })
  onUnmounted(() => {
    SceneContext?.remove(uuid)
  })

  function check(pos: IPos) {
    if (!SceneContext) return true
    return SceneContext.checkValid(pos)
  }
  function correct(pos: Required<IPos>) {
    if (!SceneContext) return pos
    return SceneContext.correct(pos)
  }

  return {
    emit: (name: string, withoutConstraint?: boolean) => {
      SceneContext?.emit(name, uuid, withoutConstraint)
    },
    check,
    correct,
    clearSelectState: SceneContext?.clearSelectState,
    width: SceneContext?.width,
    height: SceneContext?.height,
    history: SceneContext?.history,

    scale,
    handle,
    lockAspectRatio,
    minWidth,
    minHeight,
    disabledDrag,
    disabledResize,
    fixNonMonospaced,
    transformScale,
    keyboard,
  }
}
