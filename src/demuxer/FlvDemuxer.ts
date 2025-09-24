import flvParser from './flvParser'
import { Header, Options, TagType, ScriptTagBody } from './type'

export class FlvDemuxer {
  private pushFuncs: Function[] = []
  private payload = new Uint8Array(0)
  private offset = 0
  private is_parsing = false // 是否正在解析
  private header: Header | undefined
  private metadata: ScriptTagBody = {}
  private tag: any

  private onHeader
  private onTag

  debug = false

  constructor({ onHeader, onTag, debug = false }: Options) {
    this.onHeader = onHeader
    this.onTag = onTag
    this.debug = debug
  }

  init = () => {
    this.pushFuncs = []
    this.payload = new Uint8Array(0)
    this.offset = 0
    this.is_parsing = false
    this.header = undefined
    this.metadata = {}
    this.tag = undefined
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: init`)
    }
  }

  destroy = () => {
    this.pushFuncs = []
    this.payload = new Uint8Array(0)
    this.offset = 0
    this.is_parsing = false
    this.header = undefined
    this.metadata = {}
    this.tag = undefined
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: destroy`)
    }
  }

  push = (payload: Uint8Array) => {
    const func = () => {
      // 合并数据
      const _payload = new Uint8Array(this.payload.byteLength + payload.byteLength)
      _payload.set(this.payload, 0)
      _payload.set(payload, this.payload.byteLength)
      this.payload = _payload
    }
    this.pushFuncs.push(func)
    this.parse()
  }

  private parse = () => {
    if (this.is_parsing || this.pushFuncs.length === 0) return
    this.is_parsing = true

    {
      this.pushFuncs[0]()
      this.pushFuncs.splice(0, 1)
      // if (this.debug) {
      //   console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: parse`, this.payload)
      // }
    }

    const view = new DataView(this.payload.buffer)

    if (!this.header) {
      this.parseHeader(view)
    }
    this.parseTag(view)

    this.is_parsing = false
    this.parse()
  }

  private parseHeader = (view: DataView) => {
    this.header = {
      signature: flvParser.header.getSignature(view),
      version: flvParser.header.getVersion(view),
      flags: flvParser.header.getFlags(view),
      dataOffset: flvParser.header.getDataOffset(view)
    }
    this.offset = this.header?.dataOffset
    this.onHeader && this.onHeader(this.header)
    if (this.debug) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: header`, this.header)
    }
    return this.header
  }

  private parseTag = (view: DataView) => {
    const parseTagHeader = (view: DataView, offset: number) => {
      const obj = {
        tagType: flvParser.tag.tagHeader.getTagType(view, offset),
        dataSize: flvParser.tag.tagHeader.getDataSize(view, offset),
        timestamp: flvParser.tag.tagHeader.getTimestamp(view, offset),
        timestampExtended: flvParser.tag.tagHeader.getTimestampExtended(view, offset),
        streamID: flvParser.tag.tagHeader.getStreamID(view, offset)
      }
      if (this.debug) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: parseTagHeader`, obj)
      }
      return obj
    }

    const parseTagBody = (tagType: TagType, view: DataView, offset: number, dataSize: number) => {
      let tagBody

      switch (tagType) {
        case 'script':
          {
            tagBody = flvParser.tag.tagBody.parseMetaData(view, offset, dataSize)
          }
          break
        case 'audio':
          {
            tagBody = flvParser.tag.tagBody.parseAudio(view, offset, dataSize)
          }
          break

        case 'video':
          {
            tagBody = flvParser.tag.tagBody.parseVideo(view, offset, dataSize)
          }
          break
      }
      if (this.debug) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;', `------->Breathe: parseTagBody`, tagBody)
      }
      return tagBody
    }
    while (this.offset < view.byteLength) {
      const isSurplus = flvParser.checkSurplus(view, this.offset)
      if (isSurplus === false) {
        this.payload = this.payload.slice(this.offset) // 从上次header前截取
        this.offset = 0 // 重置为0
        break
      }

      const tagHeader = parseTagHeader(view, this.offset + 4) // previousTagSize(4)

      const { tagType, dataSize } = tagHeader

      const tagBody = parseTagBody(tagType, view, this.offset + 4 + 11, dataSize) // previousTagSize(4) tagHeader(11)

      this.tag = { header: tagHeader, body: tagBody }
      this.onTag && this.onTag(this.tag)

      this.offset = this.offset + 4 + 11 + dataSize // previousTagSize(4) tagHeader(11) tagBody(dataSize)
    }
  }
}
