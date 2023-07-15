import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { inject, onMounted } from 'vue-demi'
import type { INodeInfo, IPos } from '../components/freeDomWrap'

let id = 0

export function useSceneContext(context: INodeInfo) {
  const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
  const uuid = id++

  onMounted(() => {
    SceneContext?.register(uuid, context)
  })

  function check(pos: IPos) {
    return SceneContext?.checkValid(pos)
  }

  return {
    emit: (name: string) => SceneContext?.emit(name, uuid),
    check,
  }
}
