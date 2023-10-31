import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { computed, inject, onMounted, onUnmounted } from 'vue-demi'
import type { INodeInfo, IPos } from '../components/freeDomWrap'
import type { FreeDomProps } from '../components/freeDom'

let id = 0

export function useSceneContext(context: INodeInfo, props: FreeDomProps) {
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
    emit: (name: string) => SceneContext?.emit(name, uuid),
    check,
    correct,
    width: SceneContext?.width,
    height: SceneContext?.height,

    scale,
    handle,
    lockAspectRatio,
    minWidth,
    minHeight,
    disabledDrag,
    disabledResize,
    fixNonMonospaced,
    transformScale,
  }
}
