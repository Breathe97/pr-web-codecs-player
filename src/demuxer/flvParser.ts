const textDecoder = new TextDecoder('utf-8') // 指定编码格式

// 检查是否为AVCC格式
export const isACVV = (view: DataView, offset: number) => {
  const u8Array = new Uint8Array(view.buffer.slice(offset, offset + 3))
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: u8Array`, u8Array)
  const str = textDecoder?.decode(u8Array) || ''
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: str`, str)

  // return data.length >= 4 && data[0] === 0x00 && data[1] === 0x00 && data[2] === 0x00 && data[3] === 0x01
}

export const isH264AnnexB = (data: Uint8Array) => {
  // 检查数据是否足够长（至少包含1字节起始码）
  if (data.length < 3) return false

  let offset = 0

  while (offset <= data.length - 3) {
    // 查找起始码：0x000001（3字节）或0x00000001（4字节）
    if (data[offset] === 0x00 && data[offset + 1] === 0x00 && data[offset + 2] === 0x01) {
      // 找到3字节起始码，跳过并继续检查后续数据
      offset += 3
    } else if (offset + 3 < data.length && data[offset] === 0x00 && data[offset + 1] === 0x00 && data[offset + 2] === 0x00 && data[offset + 3] === 0x01) {
      // 找到4字节起始码，跳过并继续检查后续数据
      offset += 4
    } else {
      // 未找到起始码，说明不是AnnexB格式
      return false
    }
  }

  // 检查起始码是否出现在数据末尾（无效情况）
  if (offset === data.length) {
    return false
  }

  // 检查起始码后是否为合法的NAL单元头部（1字节）
  const nalHeader = data[offset]
  const forbiddenBit = (nalHeader & 0x80) >> 7 // F位（禁止位）
  const nri = (nalHeader & 0x60) >> 5 // NRI（重要性指示）
  const type = nalHeader & 0x1f // Type（NAL单元类型）

  // 禁止位必须为0，类型必须在合法范围（1~31）
  return forbiddenBit === 0 && type >= 1 && type <= 31
}

export const getSignature = (view: DataView) => {
  const u8Array = new Int8Array(view.buffer, 0, 3)
  return textDecoder?.decode(u8Array) || ''
}

export const getVersion = (view: DataView) => {
  return `${view.getInt8(3)}`
}

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

export const getDataOffset = (view: DataView) => {
  return view.getInt32(5)
}

export const getPreviousTagSize = (view: DataView, offset: number) => {
  const size = view.getInt32(offset)
  return size
}

export const checkSurplus = (view: DataView, offset: number) => {
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
    const _offset = offset + 4 + 11 + 1
    const dataSize = (view.getUint8(_offset) << 16) | (view.getUint8(_offset + 1) << 8) | view.getUint8(_offset + 2) // 数据长度
    const needLength = offset + dataSize
    // 剩余的长度足够
    if (needLength > length) {
      legal = false
    }
  }
  return legal
}

export const getTagType = (view: DataView, offset: number) => {
  const num = view.getInt8(offset)
  let str: 'script' | 'audio' | 'video' = `script`
  switch (num) {
    case 8:
      str = 'audio'
      break
    case 9:
      str = 'video'
      break
  }
  return str
}

export const getDataSize = (view: DataView, offset: number) => {
  const num = (view.getUint8(offset + 1) << 16) | (view.getUint8(offset + 2) << 8) | view.getUint8(offset + 3)
  return num
}

export const getTimestamp = (view: DataView, offset: number) => {
  const num = (view.getUint8(offset + 4) << 16) | (view.getUint8(offset + 5) << 8) | view.getUint8(offset + 6)
  return num
}

export const getTimestampExtended = (view: DataView, offset: number) => {
  return view.getInt8(offset + 7)
}

export const getStreamID = (view: DataView, offset: number) => {
  const num = (view.getUint8(offset + 8) << 16) | (view.getUint8(offset + 9) << 8) | view.getUint8(offset + 10)
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
  const num = view.getInt8(offset)
  const soundFormat = (num >> 4) & 0x0f // 音频编码格式
  const soundRate = (num >> 2) & 0x03 // 采样率
  const soundSize = (num >> 1) & 0x01 // 采样位数
  const soundType = num & 0x01 // 声道模式
  const data = new Uint8Array(view.buffer.slice(offset + 1, offset + dataSize))
  return { soundFormat, soundRate, soundSize, soundType, data }
}

export const parseVideo = (view: DataView, offset: number, dataSize: number) => {
  // [0]字节
  const num = view.getInt8(offset)
  const frameType = (num >> 4) & 0x0f // 帧类型
  const codecID = num & 0x0f // 视频编码格式

  // [1]字节
  const avcPacketType = view.getInt8(offset + 1) // AVC 包类型（仅 H.264）

  // [2,3,4]字节
  const cts = (view.getUint8(offset + 2) << 16) | (view.getUint8(offset + 3) << 8) | view.getUint8(offset + 4)

  // [5,dataSize]字节
  const data = new Uint8Array(view.buffer.slice(offset + 5, offset + dataSize))

  if (avcPacketType === 0 && codecID === 7) {
    // [5]字节
    const version = view.getInt8(offset + 5)
    // [6,7，8]字节
    const u8Array = new Uint8Array(view.buffer.slice(offset + 6, offset + 9))
    const arr = Array.from(u8Array, (u) => u.toString(16).padStart(2, '0'))
    const str = arr.join('')
    const codec = `avc1.${str}`

    // const naluLengthSize = view.getInt8(offset + 10)
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: naluLengthSize`, naluLengthSize)

    return { frameType, codecID, avcPacketType, cts, data, version, codec }
  }

  return { frameType, codecID, avcPacketType, cts, data }
}

export const header = { getSignature, getVersion, getFlags, getDataOffset }

export const tagHeader = { getTagType, getDataSize, getTimestamp, getTimestampExtended, getStreamID }

export const tagBody = { parseAudio, parseVideo, parseMetaData }

export const tag = { tagHeader, tagBody }

export default { header, getPreviousTagSize, checkSurplus, tag }
