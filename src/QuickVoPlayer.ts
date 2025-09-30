import { PrWebCodecsPlayer } from './PrWebCodecsPlayer'

import * as protos from './protos/index'

// 解析自定义SEI信息
const parseSEI = (payload: Uint8Array) => {
  let index = 0

  let payloadType = 0
  while (true) {
    const num = payload[index]
    payloadType = payloadType + num
    index = index + 1
    if (num !== 0xff) break
  }

  let payloadSize = 0
  while (true) {
    const num = payload[index]
    payloadSize = payloadSize + num
    index = index + 1
    if (num !== 0xff) break
  }

  // 处理Type=5的user_data_unregistered
  if (payloadType === 5) {
    // UUID是user_data_unregistered的固定前缀，用于唯一标识业务角色（如直播房间ID、设备指纹等）。从Payload的第1个字节开始，连续读取16个字节（十六进制格式）
    const uuidBytes = payload.slice(index, index + 16)
    const arr = Array.from(uuidBytes, (item) => item.toString(16).padStart(2, '0'))
    const uuid = arr.join('')
    index = index + 16

    // 业务数据位于UUID之后，长度为Payload Size - 16
    const payloadDataLength = payloadSize - 16
    const payloadData = payload.slice(index, index + payloadDataLength)

    const res = protos.com.quick.voice.proto.SeiData.decode(payloadData)

    const { event = 0 } = res
    const data_remote = res.data

    let data

    switch (event) {
      case 0: // 布局事件
        {
          data = protos.com.quick.voice.proto.LayoutData.decode(res.data)
        }
        break
      case 1: // 自定义数据事件
        {
          data = protos.com.quick.voice.proto.CustomInfo.decode(res.data)
        }
        break
    }

    const result = { uuid, ...res, event, data_remote, data }

    return result
  }
}

export class QuickVoPlayer extends PrWebCodecsPlayer {
  constructor() {
    super()
  }

  onSEI = (payload: Uint8Array) => {
    const res = parseSEI(payload)
    // 布局事件
    if (res?.event === 0) {
      const { data } = res
      // @ts-ignore
      const { userMap } = data
      const users = [...Object.values(userMap)]
      for (const user of users) {
        // @ts-ignore
        const { id, videos = [] } = user
        for (const video of videos) {
          const { x, y, width, height } = video
          this.addCut(id, x, y, width, height)
        }
      }
    }
  }
}
