export type TagType = 'audio' | 'video' | 'script'

export interface Header {
  signature: string
  version: string
  flags: {
    audio: Boolean
    video: Boolean
  }
  dataOffset: number
}

export interface ScriptTagBody {
  width: number
  height: number
  fps: number
  [key: string]: any
}

export interface AudioTagBody {
  soundFormat: string
  soundRate: string
  soundSize: string
  soundType: string
  data: Uint8Array
}

export interface VideoTagBody {
  frameType: number
  codecID: number
  avcPacketType: number
  data: Uint8Array
  codec?: string
}

export type Tag = {
  header: {
    tagType: TagType
    dataSize: number
    timestamp: number
    timestampExtended: number
    streamID: number
  }
  body: ScriptTagBody & AudioTagBody & VideoTagBody
}

export interface Options {
  onHeader?: (data: Header) => void
  onTag?: (data: Tag) => void
  debug?: boolean
}
