// 参考 https://www.jianshu.com/p/f667edff9748
// 参考 https://www.cnblogs.com/yaozhongxiao/archive/2013/04/12/3016302.html

const textDecoder = new TextDecoder('utf-8') // 指定编码格式

export const getAmfType = (view: DataView, offset: number) => {
  const amfType = view.getUint8(offset)
  return amfType
}

export const getAMFName = (view: DataView, offset: number, size: number) => {
  const u8Array = new Int8Array(view.buffer, offset, size)
  const key = textDecoder?.decode(u8Array) || ''
  return key
}

export const getAMFValueSize = (view: DataView, offset: number, amfType: number) => {
  let size = 0
  switch (amfType) {
    case 0x00: // Number
      {
        size = 8
      }
      break
    case 0x01: // Boolean
      {
        size = 1
      }
      break
    case 0x02: // String
      {
        size = view.getUint16(offset, false)
      }
      break
    case 0x03: // Object
      {
      }
      break
    case 0x08: // Array
      {
        size = view.getUint16(size, false)
      }
      break
  }
  return size
}

export const getAMFValue = (view: DataView, offset: number, amfType: number) => {
  let currentOffset = offset
  let value: any
  let length = 0
  switch (amfType) {
    case 0x00: // Number
      {
        value = view.getFloat64(currentOffset, false)
        length = 8
      }
      break
    case 0x01: // Boolean
      {
        value = !!view.getUint8(currentOffset)
        length = 1
      }
      break
    case 0x02: // String
      {
        value = ''
        const size = view.getUint16(currentOffset, false)
        currentOffset = currentOffset + 2

        const u8Array = new Int8Array(view.buffer, currentOffset, size).filter((item) => item !== 0x00)
        const str = textDecoder?.decode(u8Array) || ''
        value = str.trim()
        length = 2 + size
      }
      break
    case 0x03: // Object
      {
        value = {}

        while (currentOffset < view.byteLength) {
          const name_size = view.getUint16(currentOffset, false)
          if (name_size === 0) break
          currentOffset = currentOffset + 2

          const key = getAMFName(view, currentOffset, name_size)
          currentOffset = currentOffset + name_size

          const amfType = getAmfType(view, currentOffset)
          if (amfType === 0x06) break
          currentOffset = currentOffset + 1

          const res = getAMFValue(view, currentOffset, amfType)
          currentOffset = currentOffset + res.length

          value[key] = res.value

          length = 2 + name_size + 1 + res.length
        }
      }
      break
    case 0x08: // Array Object
      {
        value = {}
        const key_num = view.getUint32(currentOffset, false) // 属性个数
        currentOffset = currentOffset + 4

        for (let index = 0; index < key_num; index++) {
          const name_size = view.getUint16(currentOffset, false)
          currentOffset = currentOffset + 2

          const key = getAMFName(view, currentOffset, name_size)
          currentOffset = currentOffset + name_size

          const amfType = getAmfType(view, currentOffset)
          currentOffset = currentOffset + 1

          const res = getAMFValue(view, currentOffset, amfType)
          currentOffset = currentOffset + res.length

          value[key] = res.value
          length = 2 + name_size + 1 + res.length
        }
      }
      break
    case 0x0a: // Array Any
      {
        value = []
        const key_num = view.getUint32(currentOffset, false) // 属性个数
        currentOffset = currentOffset + 4
        for (let index = 0; index < key_num; index++) {
          const amfType = getAmfType(view, currentOffset)
          currentOffset = currentOffset + 1

          const res = getAMFValue(view, currentOffset, amfType)
          currentOffset = currentOffset + res.length
          value.push(res.value)
          length = 1 + res.length
        }
      }
      break
  }
  const res = { amfType, length, value }
  return res
}

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

/**
 *
 * @param num number
 * @param origin_radix number
 * @param target_radix number default: 10
 */
const convertRadix = (num: number, { origin_radix, target_radix }: { origin_radix: number; target_radix?: number }) => {
  if (!target_radix) {
    target_radix = 10
  }
  // 8进制(Number) => 8进制(字符串) => 10进制(数字) => 16进制(字符串) => 16进制(数字)
  const radix_10_str = num.toString() // 转为字符串
  const radix_10_num = Number.parseInt(radix_10_str, origin_radix) // 转为10进制数字
  const radix_target_str = radix_10_num.toString(target_radix).padStart(4, '0x') // 转为目标进制字符串
  return radix_target_str
}

export const parseMetaData = (view: DataView, offset: number, dataSize: number) => {
  let currentOffset = offset
  // [0]字节
  {
    const amfType = view.getUint8(currentOffset)
    if (amfType !== 0x02) throw new Error('Invalid AMF type for onMetaData (expected 0x02)')
    currentOffset = currentOffset + 1
  }

  // [1，2]字节
  const size = view.getUint16(currentOffset, false) // 大端序
  currentOffset = currentOffset + 2

  // [3,size]字节 一般固定为 onMetaData
  {
    const u8Array = new Int8Array(view.buffer, currentOffset, size)
    const str = textDecoder?.decode(u8Array) || ''
    if (str !== 'onMetaData') throw new Error("Expected 'onMetaData' string")
    currentOffset = currentOffset + size
  }

  // [0]字节
  const amfType = getAmfType(view, currentOffset)
  currentOffset = currentOffset + 1

  // 递归解析
  const value = getAMFValue(view, currentOffset, amfType)

  return value
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
