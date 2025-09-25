// 参考 https://www.jianshu.com/p/f667edff9748

const textDecoder = new TextDecoder('utf-8') // 指定编码格式

const getUint24 = (view: DataView, offset: number) => {
  const num = (view.getUint8(offset) << 16) | (view.getUint8(offset + 1) << 8) | view.getUint8(offset + 2)
  return num
}

// [0,1,2]字节
export const getSignature = (view: DataView) => {
  const u8Array = new Int8Array(view.buffer, 0, 3)
  return textDecoder?.decode(u8Array) || ''
}

// [3]字节
export const getVersion = (view: DataView) => {
  const u8Array = new Int8Array(view.buffer, 3, 1)
  return u8Array[0]
}

// [4]字节
export const getFlags = (view: DataView) => {
  const u8Array = new Int8Array(view.buffer, 4, 1)
  const str = u8Array[0].toString(2).padStart(5, '0')
  const arr = str.split('')
  const [, , video, , audio] = arr

  return {
    audio: audio === '1' ? true : false,
    video: video === '1' ? true : false
  }
}

// [5,6,7,8]字节
export const getDataOffset = (view: DataView) => {
  return view.getInt32(5)
}

// [0,~,8]字节
export const header = { getSignature, getVersion, getFlags, getDataOffset }

export const isSurplusTag = (view: DataView, offset: number) => {
  let legal = true // 默认合法
  const length = view.byteLength

  // previousTagSize 不完整
  if (offset + 4 > length) {
    legal = false
  }
  // tagHeader 不完整
  else if (offset + 4 + 11 > length) {
    legal = false
  }
  // tagBody 不完整
  else {
    const dataSize = getUint24(view, offset + 4 + 1) // 数据长度
    const needLength = offset + 4 + 11 + dataSize
    // 剩余的长度足够
    if (needLength > length) {
      legal = false
    }
  }
  return legal
}

// [0,1,2,3]字节
export const getPreviousTagSize = (view: DataView, offset: number) => {
  const size = view.getInt32(offset)
  return size
}

// [0]字节
export const getTagType = (view: DataView, offset: number) => {
  const num = view.getInt8(offset)
  let str: 'script' | 'audio' | 'video' | undefined
  switch (num) {
    case 18:
      str = 'script'
      break
    case 8:
      str = 'audio'
      break
    case 9:
      str = 'video'
      break
  }
  return str
}

// [1,2,3]字节
export const getDataSize = (view: DataView, offset: number) => {
  const num = getUint24(view, offset + 1)
  return num
}

// [4,5,6]字节
export const getTimestamp = (view: DataView, offset: number) => {
  const num = getUint24(view, offset + 4)
  return num
}

// [7]字节
export const getTimestampExtended = (view: DataView, offset: number) => {
  return view.getInt8(offset + 7)
}

// [8,9,10]字节
export const getStreamID = (view: DataView, offset: number) => {
  const num = getUint24(view, offset + 8)
  return num
}

export const parseMetaData = (view: DataView, offset: number, dataSize: number) => {
  let currentOffset = offset
  const metadata: { [key: string]: any } = {}

  // 1. 读取第一个 AMF 包（字符串类型，"onMetaData"）
  {
    const amfType = view.getUint8(currentOffset)
    if (amfType !== 0x02) throw new Error('Invalid AMF type for onMetaData (expected 0x02)')
  }

  const size = view.getUint16(currentOffset + 1, false) // 大端序
  currentOffset = currentOffset + 3

  {
    const u8Array = new Int8Array(view.buffer, currentOffset, size)
    const str = textDecoder?.decode(u8Array) || ''
    if (str !== 'onMetaData') throw new Error("Expected 'onMetaData' string")
    currentOffset = currentOffset + size
  }

  // 2. 读取第二个 AMF 包（ECMA 数组类型，包含元数据键值对）
  {
    const amfType = view.getUint8(currentOffset)

    switch (amfType) {
      case 0x08:
        {
          const arrayLen = view.getUint32(currentOffset + 1, false) // 大端序
          currentOffset += 5

          // 3. 解析 ECMA 数组中的键值对
          for (let i = 0; i < arrayLen; i++) {
            // 读取键（字符串）
            const size = view.getUint16(currentOffset, false)

            currentOffset += 2

            const u8Array = new Int8Array(view.buffer, currentOffset, size)
            const key = textDecoder?.decode(u8Array) || ''
            currentOffset += size

            // 读取值类型
            const valueType = view.getUint8(currentOffset)
            currentOffset += 1

            // 根据类型读取值
            let value
            switch (valueType) {
              case 0x00: // Number
                {
                  value = view.getFloat64(currentOffset, false)
                  currentOffset = currentOffset + 8
                }
                break
              case 0x01: // Boolean
                {
                  value = !!view.getUint8(currentOffset)
                  currentOffset = currentOffset + 1
                }
                break
              case 0x02: // String
                {
                  const size = view.getUint16(currentOffset, false)
                  currentOffset += 2
                  const u8Array = new Int8Array(view.buffer, currentOffset, size)
                  value = textDecoder?.decode(u8Array) || ''
                  currentOffset = currentOffset + size
                }
                break
              case 0x03:
                {
                  const size = view.getUint16(currentOffset, false)
                  currentOffset += 2
                  const u8Array = new Int8Array(view.buffer, currentOffset, size)
                  value = u8Array
                }
                break
              case 0x08:
                {
                  const size = view.getUint16(currentOffset, false)
                  currentOffset += 2
                  const u8Array = new Int8Array(view.buffer, currentOffset, size)
                  value = u8Array
                }
                break
              default:
                throw new Error(`Unsupported value type: 0x${valueType.toString(16)}`)
            }

            metadata[key] = value
          }
        }
        break
    }
  }

  return metadata
}

export const parseAudio = (view: DataView, offset: number, dataSize: number) => {
  // [0]
  const num = view.getInt8(offset)
  const soundFormat = (num >> 4) & 0x0f // 音频编码格式
  const soundRate = (num >> 2) & 0x03 // 采样率
  const soundSize = (num >> 1) & 0x01 // 采样位数
  const soundType = num & 0x01 // 声道模式

  // soundFormat === 10 才存在
  if (soundFormat === 10) {
    // [1]
    const accPacketType = view.getInt8(offset + 1)
    const data = new Uint8Array(view.buffer, offset + 2, dataSize)
    return { soundFormat, soundRate, soundSize, soundType, accPacketType, data }
  } else {
    const data = new Uint8Array(view.buffer, offset + 1, dataSize)
    return { soundFormat, soundRate, soundSize, soundType, data }
  }
}

export const parseVideo = (view: DataView, offset: number, dataSize: number) => {
  // [0]字节
  const num = view.getInt8(offset)
  const frameType = (num >> 4) & 0x0f // 帧类型
  const codecID = num & 0x0f // 视频编码格式

  // [1]字节
  const avcPacketType = view.getInt8(offset + 1) // AVC 包类型（仅 H.264）

  // [2,3,4]字节
  const cts = getUint24(view, offset + 2)

  // [5,dataSize]字节
  const data = new Uint8Array(view.buffer.slice(offset + 5, offset + dataSize))

  // h264 config
  if (codecID === 7 && avcPacketType === 0) {
    // [5]字节
    const version = view.getInt8(offset + 5)
    // [6,7，8]字节
    const u8Array = new Uint8Array(view.buffer.slice(offset + 6, offset + 9))
    const arr = Array.from(u8Array, (u) => u.toString(16).padStart(2, '0'))
    const str = arr.join('')
    const codec = `avc1.${str}`
    return { frameType, codecID, avcPacketType, cts, data, version, codec }
  }

  return { frameType, codecID, avcPacketType, cts, data }
}

export const tagHeader = { getTagType, getDataSize, getTimestamp, getTimestampExtended, getStreamID }

export const tagBody = { parseAudio, parseVideo, parseMetaData }

export const tag = { tagHeader, tagBody }

export default { header, getPreviousTagSize, isSurplusTag, tag }
