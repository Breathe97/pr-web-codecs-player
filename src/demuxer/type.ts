export type TagType = 'audio' | 'video' | 'script'

export interface Header {
  signature: string
  version: number
  flags: {
    audio: Boolean
    video: Boolean
  }
  dataOffset: number
}

export interface TagBody {
  script?: {
    [key: string]: any
  }
  audio?: {
    soundFormat: string
    soundRate: string
    soundSize: string
    soundType: string
    data: Uint8Array
  }
  video?: {
    frameType: number
    codecID: number
    avcPacketType: number
    cts: number
    data: Uint8Array
    version?: string
    codec?: string
  }
}

export interface Tag<T extends TagType> {
  header: {
    tagType: T
    dataSize: number
    timestamp: number
    timestampExtended: number
    streamID: number
  }
  body: TagBody[T]
}

export interface Options {
  onHeader?: (data: Header) => void
  onTag?: (data: Tag<'script' | 'audio' | 'video'>) => void
  debug?: boolean
}
