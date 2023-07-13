import type { SceneTokenContext } from '../util'
import { SceneToken } from '../util'
import { inject, onMounted } from 'vue-demi'
import type { INodeInfo } from '../components/freeDomWrap'

let id = 0

export function useSceneContext(context: INodeInfo) {
  const SceneContext = inject<SceneTokenContext>(SceneToken, undefined)
  const uuid = id++

  onMounted(() => {
    SceneContext?.register(uuid, context)
  })

  return {
    emit: (name: string) => SceneContext?.emit(name, uuid),
  }
}
